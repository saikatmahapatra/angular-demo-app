import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('has title', async ({ page }) => {
    await page.goto('http://localhost:4200/auth/login');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/MyApp - Login/);
  });
});