import { test, expect, type Locator, type Page } from '@playwright/test';

async function readable(locator: Locator, minimum = 4.5) {
  const ratio = await locator.evaluate(el => {
    const rgb = (value: string) => {
      const parts = value.match(/[\d.]+/g)!.map(Number);
      return [parts[0], parts[1], parts[2], parts[3] ?? 1];
    };
    const luminance = (color: number[]) => color.slice(0, 3).map(v => v / 255)
      .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
      .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const ancestors: Element[] = [];
    for (let node: Element | null = el; node; node = node.parentElement) ancestors.unshift(node);
    let background = [255, 255, 255];
    for (const node of ancestors) {
      const color = rgb(getComputedStyle(node).backgroundColor);
      background = background.map((v, i) => color[i] * color[3] + v * (1 - color[3]));
    }
    const foreground = rgb(getComputedStyle(el).color);
    const text = background.map((v, i) => foreground[i] * foreground[3] + v * (1 - foreground[3]));
    const values = [luminance(text), luminance(background)];
    return (Math.max(...values) + .05) / (Math.min(...values) + .05);
  });
  expect(ratio, `Text contrast for ${locator}`).toBeGreaterThanOrEqual(minimum);
}
async function dark(page: Page, route = '/homeNest/#/buy') {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto(route);
  await expect(page.locator('[data-theme="dark"]')).toBeVisible();
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
}

test('search and both selected view states remain readable in dark mode', async ({ page }) => {
  await dark(page);
  await readable(page.locator('.location-icon'), 3);
  await page.getByRole('button', { name: 'Map', exact: true }).click();
  await readable(page.locator('.view-active span'));
  await readable(page.locator('.map-panel-heading strong'));
  await readable(page.locator('.map-panel-heading > span'));
  await readable(page.locator('.location-cluster strong').first());
  await readable(page.locator('.location-price').first());
  await page.getByRole('button', { name: 'List', exact: true }).click();
  await readable(page.locator('.view-active span'));
  await noOverflow(page);
});

test('property controls and price tables have contrast without bright separators', async ({ page }) => {
  await dark(page, '/homeNest/#/buy?home=3');
  await expect(page.getByRole('dialog')).toBeVisible();
  for (const selector of ['.detail-icon-button', '.detail-close', '.calculator-control label strong', '.detail-description', '.history-table-row strong', '.school-info strong']) {
    await readable(page.locator(selector).first());
  }
  for (const selector of ['.detail-dialog', '.detail-dialog-header', '.detail-section', '.history-table-row', '.school-row', '.monthly-total', '.payment-breakdown', '.tax-table td']) {
    const channels = await page.locator(selector).first().evaluate(el => {
      const style = getComputedStyle(el);
      const side = ['Top', 'Bottom', 'Left', 'Right'].find(side => parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0)!;
      return style.getPropertyValue(`border-${side.toLowerCase()}-color`).match(/[\d.]+/g)!.slice(0, 3).map(Number);
    });
    expect(Math.max(...channels), `Muted divider ${selector}`).toBeLessThan(130);
  }
  await page.getByRole('button', { name: 'Plan a private tour' }).click();
  await readable(page.locator('.tour-form label').first());
  await page.locator('.detail-bottom-note').scrollIntoViewIfNeeded();
  expect(await page.locator('.detail-content-wrap').evaluate(el => el.scrollWidth > el.clientWidth)).toBe(false);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('doorway branding is shared and light mode retains light surfaces', async ({ page }) => {
  await page.goto('/homeNest/#/buy');
  await expect(page.locator('.brand-lockup .brand-mark')).toHaveCount(2);
  await expect(page.locator('.brand-wordmark').first()).toHaveText('HomeNest');
  await expect(page.locator('.brand-period')).toHaveCount(0);
  await page.getByRole('button', { name: 'Map', exact: true }).click();
  const color = await page.locator('.map-panel-heading').evaluate(el => getComputedStyle(el).backgroundColor);
  expect(color).toMatch(/^rgba?\(255, 255, 255/);
  await page.goto('/homeNest/#/buy?home=3');
  await expect(page.locator('.detail-brand .brand-mark')).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCSS('background-color', 'rgb(251, 250, 247)');
  await noOverflow(page);
});
