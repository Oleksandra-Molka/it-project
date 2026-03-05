import { test, expect } from '@playwright/test';

test('Перевірка головного заголовка на сторінці', async ({ page }) => {
    // 1. Переходимо на наш локальний сервер
    await page.goto('http://localhost:5173/');

    // 2. Знаходимо наш заголовок за CSS-класом, який ми додали в 1-й лабі
    const title = page.locator('.main-title');

    // 3. Перевіряємо, чи він взагалі видимий на екрані
    await expect(title).toBeVisible();

    // 4. Перевіряємо, чи правильний у нього текст
    await expect(title).toHaveText('Оновлена Головна версія');
});