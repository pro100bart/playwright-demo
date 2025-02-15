import { test, expect } from '@playwright/test';

test.describe('Sign up form tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://pro100bart.github.io/playwright-demo/'); // Замінити на реальну URL сторінки
  });

  test('Перевірка, що сторінка містить форму реєстрації', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Sign up form');
    await expect(page.locator('#registrationForm')).toBeVisible();
  });

  test('Перевірка валідації email', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'invalid-email'); // Некоректний email
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password123');

    await page.click('button[type="submit"]');

    await expect(page.locator('#emailError')).toHaveText('Будь ласка, введіть правильний email.');
  });

  test('Перевірка, що паролі повинні співпадати', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'wrongpassword');

    await page.click('button[type="submit"]');

    await expect(page.locator('#passwordError')).toHaveText('Паролі не співпадають.');
  });

  test('Перевірка очищення форми при натисканні Cancel', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');

    await page.click('button:has-text("Cancel")');

    await expect(page.locator('#firstName')).toHaveValue('');
    await expect(page.locator('#lastName')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
  });

  test('Перевірка успішної відправки форми', async ({ page }) => {
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'password123');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Форма успішно відправлена!');
      await dialog.accept();
    });

    await page.click('button[type="submit"]');
  });
});
