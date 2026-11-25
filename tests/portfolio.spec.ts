import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("shows verified positioning, career progression, and source-backed work", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ashish S. Jadhav",
  );
  await expect(
    page.getByText("Frontend Software Engineer", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByText("February 2025 – Present", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Education", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Karnataka State Open University (KSOU), Mysuru"),
  ).toBeVisible();
  await expect(
    page.getByText(/500\+|FlowForge|Nucleus UI|Storybook|Customers Impacted/),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Writing", exact: true }),
  ).toHaveCount(0);
  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();
  expect(JSON.parse(structuredData ?? "{}")).toMatchObject({
    "@type": "Person",
    name: "Ashish S. Jadhav",
  });
});

test("opens the independent project and validates live and repository destinations", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: /Explore project DetectGrowth/ })
    .click();
  await expect(page).toHaveURL(/\/projects\/detectgrowth$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "DetectGrowth",
  );
  await expect(page).toHaveTitle("DetectGrowth — Ashish S. Jadhav");
  await expect(
    page.getByRole("link", { name: "Live application" }),
  ).toHaveAttribute("href", "https://detectgrowth.vercel.app/applications");
  await expect(
    page.getByRole("link", { name: "Public repository" }),
  ).toHaveAttribute("href", "https://github.com/Ashishjadhav-dev/detectgrowth");
  await expect(
    page.getByRole("heading", { name: "Current limits and roadmap" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Breadcrumb" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Independent projects",
  );
  await expect(page.locator(".project-feature")).toHaveCount(1);
});

test("palette supports search, empty state, Escape and focus restoration", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const opener = isMobile
    ? page.getByRole("button", { name: "Dark theme" })
    : page.getByRole("button", { name: "Open command palette" });
  await opener.focus();
  if (isMobile) await page.keyboard.press("Control+k");
  else await opener.click();
  const dialog = page.getByRole("dialog", { name: "Quick navigation" });
  const search = dialog.getByRole("textbox", { name: "Search sections" });
  await expect(search).toBeFocused();
  await search.fill("missing");
  await expect(dialog.getByRole("status")).toContainText("No sections found");
  await search.fill("projects");
  await expect(dialog.getByRole("link")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("persists theme and offers an accessible skip link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const before = await page.locator("html").getAttribute("data-theme");
  const expected = before === "dark" ? "light" : "dark";
  await page.getByRole("button", { name: "Dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
});

test("serves the real resume and preserves the former URL", async ({
  page,
  request,
}) => {
  await page.goto("/resume");
  const content = page.getByRole("main");
  await expect(content.getByRole("heading", { level: 1 })).toHaveText(
    "Ashish S. Jadhav",
  );
  const open = content.getByRole("link", { name: "Open PDF in new tab" });
  await expect(open).toHaveAttribute("target", "_blank");
  await expect(open).toHaveAttribute(
    "href",
    "/documents/ashish-jadhav-resume.pdf",
  );
  const download = page.waitForEvent("download");
  await content.getByRole("link", { name: "Download Resume" }).click();
  expect((await download).suggestedFilename()).toBe("ashish-jadhav-resume.pdf");
  const file = await request.get("/documents/ashish-jadhav-resume.pdf");
  expect(file.headers()["content-type"]).toContain("application/pdf");
  expect(await file.body()).toEqual(
    await readFile("public/documents/ashish-jadhav-resume.pdf"),
  );
  const old = await request.get("/Ashish_Jadhav_Full_Stack.pdf", {
    maxRedirects: 0,
  });
  expect(old.status()).toBe(308);
  expect(old.headers()["location"]).toBe("/documents/ashish-jadhav-resume.pdf");
});

test("verifies public metadata, sitemap, and retired project links", async ({
  request,
}) => {
  for (const path of ["/", "/projects", "/projects/detectgrowth", "/resume"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const source = await response.text();
    expect(source).toContain('rel="canonical"');
    expect(source).toContain('property="og:image"');
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/projects/detectgrowth");
  expect(sitemap).toContain("/resume");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("/sitemap.xml");
  const preview = await request.get("/opengraph-image");
  expect(preview.headers()["content-type"]).toContain("image/png");
  for (const slug of ["flowforge", "pulse", "nucleus-ui", "missing"]) {
    expect((await request.get(`/projects/${slug}`)).status()).toBe(404);
  }
});

test("supports mobile navigation and anchors", async ({ page, isMobile }) => {
  await page.goto("/");
  const nav = isMobile
    ? page.getByRole("dialog", { name: "Navigation" })
    : page.getByRole("navigation", { name: "Primary navigation" });
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await nav.getByRole("link", { name: "Skills" }).click();
  await expect(page).toHaveURL(/#skills$/);
  if (isMobile) await expect(nav).not.toBeVisible();
  else
    await expect(nav.getByRole("link", { name: "Skills" })).toHaveAttribute(
      "aria-current",
      "location",
    );
});

test("lays out all public templates in both themes across nine widths", async ({
  page,
}, info) => {
  test.slow();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
  for (const path of ["/", "/projects", "/projects/detectgrowth", "/resume"]) {
    await page.goto(path);
    for (const theme of ["dark", "light"]) {
      if ((await page.locator("html").getAttribute("data-theme")) !== theme)
        await page.getByRole("button", { name: "Dark theme" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await expect
          .poll(
            () =>
              page.evaluate(() => {
                const main = document.querySelector("main")!;
                const heading = main.querySelector("h1")!;
                return (
                  document.documentElement.scrollWidth <= innerWidth &&
                  heading.scrollWidth <= heading.clientWidth
                );
              }),
            { message: `${path} at ${width}px in ${theme}` },
          )
          .toBe(true);
      }
    }
    await page.setViewportSize({
      width: info.project.name === "mobile" ? 390 : 1440,
      height: 940,
    });
    if (info.project.name === "desktop")
      await page.getByRole("button", { name: "Dark theme" }).click();
    await page.goto(path);
    await page.screenshot({
      path: info.outputPath(
        `${path === "/" ? "homepage" : path.split("/").at(-1)}.png`,
      ),
      animations: "disabled",
      scale: "css",
    });
  }
  expect(errors).toEqual([]);
});

test("contact validates input and presents an honest mail draft state", async ({
  page,
}) => {
  await page.goto("/#contact");
  await expect(
    page.getByRole("link", { name: "ashishbox13@gmail.com" }),
  ).toHaveAttribute("href", "mailto:ashishbox13@gmail.com");
  await page.getByRole("button", { name: "Create email draft" }).click();
  await expect(page.locator("#contact-name:invalid")).toHaveCount(1);
  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("visitor@example.com");
  await page
    .getByLabel("Message", { exact: true })
    .fill("A project with React & TypeScript? Let's talk.");
  await page.getByRole("button", { name: "Create email draft" }).click();
  await expect(page.locator(".contact-form").getByRole("status")).toContainText(
    "Nothing has been sent by this site.",
  );
});
