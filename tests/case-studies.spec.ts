import { expect, test } from "@playwright/test";
import { caseStudies } from "../data/case-studies";

const enabled = process.env.ENGINEERING_CASE_STUDIES_PUBLIC === "true";

test("release flag governs discovery, pages and supporting assets", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Featured Engineering Case Studies" }),
  ).toHaveCount(enabled ? 1 : 0);
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toEqual(
    enabled
      ? expect.stringContaining("/case-studies/csv-performance")
      : expect.not.stringContaining("/case-studies"),
  );
  for (const path of [
    "/case-studies",
    "/case-studies/csv-performance",
    "/case-studies/social-preview",
  ]) {
    expect((await request.get(path)).status()).toBe(enabled ? 200 : 404);
  }
  expect((await request.get("/case-studies/missing")).status()).toBe(404);
  expect((await request.get("/Ashish_Jadhav_Full_Stack.pdf")).ok()).toBe(true);
});

test.describe("enabled engineering case studies", () => {
  test.skip(!enabled, "Requires an enabled build");

  test("supports combined filters, shared URLs, and clearing empty results", async ({
    page,
  }) => {
    await page.goto("/case-studies?category=performance&q=Papa%20Parse");
    const collection = page.getByRole("region", { name: "All case studies" });
    const search = collection.getByRole("searchbox");
    await expect(search).toHaveValue("Papa Parse");
    await expect(collection.getByRole("status")).toHaveText("1 case study");
    await expect(
      collection.getByRole("button", { name: "Performance", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await search.fill("no matching technology");
    await expect(
      collection.getByRole("heading", { name: "No matching case studies" }),
    ).toBeVisible();
    await expect(page).toHaveURL(/q=no\+matching\+technology/);
    await collection
      .getByRole("button", { name: "Show all case studies" })
      .click();
    await expect(collection.getByRole("status")).toHaveText("10 case studies");
    await expect(search).toBeFocused();
    await expect(page).toHaveURL(/\/case-studies$/);
    await collection
      .getByRole("link", { name: /Large-Scale CSV Processing/ })
      .click();
    await expect(page).toHaveURL(/\/case-studies\/csv-performance$/);
    await page.getByLabel("Dataset size").selectOption("4");
    await expect(page.getByText("213.3 ms", { exact: true })).toHaveCount(2);
    await page.getByLabel("Dataset size").selectOption("6");
    await page
      .getByRole("combobox", { name: /Measurement/ })
      .selectOption("heap");
    await expect(page.getByText("148.8 MiB", { exact: true })).toHaveCount(2);
  });

  test("serves each article with static content and canonical metadata", async ({
    request,
  }) => {
    for (const { slug, title } of caseStudies) {
      const response = await request.get(`/case-studies/${slug}`);
      expect(response.status(), slug).toBe(200);
      const html = await response.text();
      expect(html, slug).toContain('rel="canonical"');
      expect(html, slug).toContain("TechArticle");
      expect(html, slug).toContain(title.replaceAll("&", "&amp;"));
    }
    const response = await request.get("/case-studies/portfolio.pdf");
    expect([200, 404]).toContain(response.status());
    if (response.ok())
      expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test("keeps navigation, content and tables within the viewport in both themes", async ({
    page,
  }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
    for (const route of ["/case-studies", "/case-studies/csv-performance"]) {
      await page.goto(route);
      for (const theme of ["light", "dark"]) {
        if ((await page.locator("html").getAttribute("data-theme")) !== theme) {
          await page.getByRole("button", { name: "Toggle theme" }).click();
        }
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        for (const width of widths) {
          await page.setViewportSize({ width, height: 950 });
          await expect
            .poll(() =>
              page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
            )
            .toBe(true);
          await expect
            .poll(() =>
              page
                .locator(".cs-wrap h1")
                .evaluate(
                  (heading) => heading.scrollWidth <= heading.clientWidth,
                ),
            )
            .toBe(true);
        }
      }
      await page.setViewportSize({
        width: info.project.name === "mobile" ? 390 : 1440,
        height: info.project.name === "mobile" ? 840 : 1080,
      });
      if (info.project.name === "mobile") {
        await page.getByRole("button", { name: "Toggle theme" }).click();
      }
      await page.goto(route);
      await expect(page.locator(".nav-wrap")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute(
        "data-theme",
        /dark|light/,
      );
      await page.screenshot({
        scale: "css",
        animations: "disabled",
        path: info.outputPath(
          `${route.endsWith("performance") ? "article" : "collection"}.png`,
        ),
      });
    }
    expect(errors).toEqual([]);
  });

  test("runs synthetic workflow, segmentation, caching, event and message demos", async ({
    page,
  }) => {
    await page.goto("/case-studies/automation-builder");
    await page.getByText("Explore a branching workflow").click();
    await page.getByRole("button", { name: "No", exact: true }).click();
    await expect(page.getByText("End workflow without sending")).toBeVisible();

    await page.goto("/case-studies/audience-segmentation");
    await page.getByText("Edit a nested condition tree").click();
    await page
      .getByRole("combobox", { name: /Combine conditions/ })
      .selectOption("AND");
    await page
      .getByRole("spinbutton", { name: "Days since last open" })
      .fill("7");
    await expect(page.getByRole("status")).toContainText(
      "within 7 days AND Shopify orders",
    );

    await page.goto("/case-studies/multi-tenant-caching");
    await page.getByText("Simulate request deduplication").click();
    await page.getByRole("button", { name: "Run simulation" }).click();
    await expect(page.getByRole("status")).toContainText(
      "1 list request and 1 counters request",
    );

    await page.goto("/case-studies/transactional-live-feed");
    await page.getByText("Browse synthetic transactional events").click();
    await page.getByRole("button", { name: "Next page" }).click();
    await expect(page.getByRole("status")).toContainText(
      "Current cursor: EV-105",
    );
    await page.getByRole("searchbox", { name: "Event name" }).fill("receipt");
    await expect(page.getByRole("status")).toContainText(
      "Current cursor: start",
    );

    await page.goto("/case-studies/ai-content-editors");
    await page.getByText("Preview SMS and WhatsApp content").click();
    await page.getByRole("textbox", { name: "Draft text" }).fill("Hello 🙂");
    await expect(page.getByRole("status")).toContainText("Unicode");
    await page
      .getByRole("combobox", { name: /Channel/ })
      .selectOption("WhatsApp");
    await page.getByRole("checkbox", { name: "Show sample carousel" }).check();
    await expect(
      page.getByText("Sample media · Member benefits"),
    ).toBeVisible();
  });

  test("supports keyboard navigation, contents anchors and illustrative dialogs", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("dialog", { name: "Navigation" })
        .getByRole("link", { name: "Case Studies" })
        .click();
    } else {
      await page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: "Case Studies" })
        .click();
      await expect(
        page
          .getByRole("navigation", { name: "Primary navigation" })
          .getByRole("link", { name: "Case Studies" }),
      ).toHaveAttribute("aria-current", "location");
    }
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Engineering Case Studies",
    );
    await page.goto("/case-studies/design-system");
    if (isMobile) await page.getByText("On this page", { exact: true }).click();
    await page
      .getByRole("navigation", { name: "On this page" })
      .getByRole("link", { name: "Token hierarchy and component architecture" })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#architecture$/);
    await page
      .getByText("Try keyboard navigation in a command palette")
      .click();
    const opener = page.getByRole("button", {
      name: "Open demo command palette",
    });
    await opener.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("searchbox", { name: "Search demo commands" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
  });
});
