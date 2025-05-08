// @ts-check
import { test, expect } from '@playwright/test';

test('title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Lab/);
});

test('verify form login has visible', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect form login has visible.
  await page.getByTestId('user-name').isVisible();
  await page.getByTestId('password').isVisible();
  await page.getByTestId('login-button').isVisible();

});

test('verify login has successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect user login successfully.
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/.*inventory/);

});
