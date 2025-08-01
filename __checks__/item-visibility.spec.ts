import { test, expect } from '@playwright/test';

test('item visibility check', async ({ page }) => {
  await page.goto('https://danube-web.shop/');
  
  // Click on the "Books" heading
  await page.getByRole('heading', { name: 'Books', exact: true }).click();
  
  // Check visibility of 10 different items on the page
  await expect(page.getByText('Haben oder haben')).toBeVisible();
  await expect(page.getByText('Parry Hotter')).toBeVisible();
  await expect(page.getByText('The Polar Turtle')).toBeVisible();
  await expect(page.getByText('The Grand Grotsby')).toBeVisible();
  await expect(page.getByText('Celsius 233')).toBeVisible();
  await expect(page.getByText('The Transformation')).toBeVisible();
  await expect(page.getByText('Fantasy').first()).toBeVisible();
  await expect(page.getByText('$9.95').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Top sellers' })).toBeVisible();
});