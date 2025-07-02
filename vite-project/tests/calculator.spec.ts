import { test, expect } from "@playwright/test";

test("anonymous calculator works", async ({ page }) => {
  await page.goto("http://localhost:8080");
  await page.getByRole("button", { name: "Survival Calculator" }).click();
  await page.selectOption("select[name=model]", { label: "RandomForest" });
  await page.fill("input[name=Age]", "35");
  await expect(page.getByTestId("prediction-result")).toHaveText(/Survived|Dead/);
});
