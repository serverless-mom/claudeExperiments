import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://danube-web.shop/');
  await page.getByText('Haben oder haben').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link').click();
  await page.locator('a').filter({ hasText: 'Fantasy' }).click();
  await expect(page.getByText('The Polar Turtle')).toBeVisible();
  await expect(page.getByText('$9').first()).toBeVisible();
});