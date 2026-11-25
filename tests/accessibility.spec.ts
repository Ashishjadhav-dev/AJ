import { expect, test } from "@playwright/test";
import axe from "axe-core";
import { caseStudies } from "../data/case-studies";

const routes = ["/", "/projects", "/projects/detectgrowth", "/resume"];
if (process.env.ENGINEERING_CASE_STUDIES_PUBLIC === "true") {
  routes.push(
    "/case-studies",
    ...caseStudies.map(({ slug }) => `/case-studies/${slug}`),
  );
}

for (const theme of ["light", "dark"] as const) {
  test(`has no automated accessibility violations in ${theme} mode`, async ({
    page,
  }) => {
    test.slow();
    await page.emulateMedia({ colorScheme: theme });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.addScriptTag({ content: axe.source });
      const violations = await page.evaluate(async () => {
        const browserAxe = (window as Window & { axe?: typeof axe }).axe;
        if (!browserAxe) throw new Error("axe did not load in the browser.");
        const { violations } = await browserAxe.run({
          runOnly: {
            type: "tag",
            values: [
              "wcag2a",
              "wcag2aa",
              "wcag21a",
              "wcag21aa",
              "wcag22aa",
              "best-practice",
            ],
          },
        });
        return violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map(({ target }) => target),
        }));
      });
      expect.soft(violations, `${theme} ${route}`).toEqual([]);
    }
  });
}

test("exposes keyboard shortcuts, landmarks and theme state in forced colors", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({
    colorScheme: "light",
    forcedColors: "active",
    reducedMotion: "reduce",
  });
  await page.goto("/");

  const skip = page.getByRole("link", { name: "Skip to content" });
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await expect(skip).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await expect(page.getByRole("main")).toMatchAriaSnapshot(`
  - main:
    - heading "Ashish S. Jadhav" [level=1]
  `);

  const darkTheme = page.getByRole("button", {
    name: "Dark theme",
    pressed: false,
  });
  await darkTheme.focus();
  await page.keyboard.press("Enter");
  const enabledTheme = page.getByRole("button", {
    name: "Dark theme",
    pressed: true,
  });
  await expect(enabledTheme).toBeFocused();
  await expect(enabledTheme).toHaveCSS("border-top-style", "solid");

  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Navigation" });
    await expect(
      menu.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  }

  await enabledTheme.focus();
  await page.keyboard.press("Control+k");
  const palette = page.getByRole("dialog", { name: "Quick navigation" });
  await expect(
    palette.getByRole("textbox", { name: "Search sections" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(enabledTheme).toBeFocused();
});

test("announces the filtered collection and keeps anchored content clear of the header", async ({
  page,
}) => {
  test.skip(
    process.env.ENGINEERING_CASE_STUDIES_PUBLIC !== "true",
    "Requires an enabled case-study build",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/case-studies");
  await page.getByRole("link", { name: "Explore case studies" }).click();
  const collection = page.getByRole("region", { name: "All case studies" });
  const label = collection.getByRole("heading", { name: "All case studies" });
  await expect
    .poll(async () => {
      const [heading, header] = await Promise.all([
        label.boundingBox(),
        page.getByRole("banner").boundingBox(),
      ]);
      return !!(heading && header && heading.y >= header.y + header.height);
    })
    .toBe(true);
  const filters = collection.getByRole("search", {
    name: "Filter case studies",
  });
  await filters
    .getByRole("button", { name: "Performance", exact: true })
    .click();
  await filters
    .getByRole("searchbox", { name: "Search case studies" })
    .fill("Papa Parse");
  await expect(collection.getByRole("status")).toHaveText(
    "1 case study in Performance matching “Papa Parse”",
  );
  await expect(
    filters.getByRole("button", {
      name: "Performance",
      exact: true,
      pressed: true,
    }),
  ).toHaveAttribute("aria-controls", "case-study-results");
});
