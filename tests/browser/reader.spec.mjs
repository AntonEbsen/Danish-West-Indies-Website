import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/history/', '/history/1792-abolition-decree/', '/history/1848-emancipation/', '/history/1878-fireburn-st-croix/', '/source-to-data/', '/about/', '/thesis/', '/sources/', '/about-ai/', '/methods/linkage/', '/teaching/', '/teaching/teacher-notes/', '/memorial/', '/memorial/hans-jonathan/', '/memorial/queen-mary/'];

for (const prefix of ['', '/da']) {
  for (const route of routes) {
    test(`readability and accessibility: ${prefix}${route}`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(`${prefix}${route}`);
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', prefix ? 'da' : 'en');
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
      for (const width of [390, 320]) {
        await page.setViewportSize({ width, height: 844 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      }
      expect(errors).toEqual([]);
    });
  }
}

test('application-reader journey, downloads and language round trip', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Inspect a source example', exact: true }).click();
  await expect(page).toHaveURL(/\/source-to-data\/$/);
  await expect(page.getByRole('cell', { name: '54', exact: true })).toBeVisible();
  for (const [name, filename] of [['Download the three values (CSV)', 'record.csv'], ['Download provenance and checks (JSON)', 'provenance.json']]) {
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('link', { name, exact: true }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe(filename);
    expect(await download.failure()).toBeNull();
  }
  await page.getByRole('link', { name: 'Dansk', exact: true }).click();
  await expect(page).toHaveURL(/\/da\/source-to-data\/$/);
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/source-to-data\/$/);
  await page.getByRole('link', { name: 'Research', exact: true }).click();
  await expect(page.getByText('Work in progress — expected MSc completion: January 2027.', { exact: true })).toBeVisible();
});

test('keyboard access and no-JavaScript navigation', async ({ browser, page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto('http://127.0.0.1:4382/');
  await staticPage.getByRole('link', { name: 'Explore the history', exact: true }).click();
  await expect(staticPage.locator('h1')).toHaveText('Three starting points in the history');
  await context.close();
});

test('print styles retain source evidence and remove navigation', async ({ page }) => {
  for (const route of ['/source-to-data/', '/da/source-to-data/', '/history/1792-abolition-decree/']) {
    await page.goto(route);
    await page.emulateMedia({ media: 'print' });
    await expect(page.getByRole('navigation', { name: /Main navigation|Hovednavigation/ })).toBeHidden();
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 255, 255)');
    await page.screenshot({ path: `test-results/print-${route.replaceAll('/', '_')}.png`, fullPage: true });
    if (process.env.PRINT_PDF_QA === '1') await page.pdf({ path: `tmp/pdfs/print-${route.replaceAll('/', '_')}.pdf`, preferCSSPageSize: true, printBackground: true });
  }
});

test('no third-party requests or live prototype tools in the reader journey', async ({ page }) => {
  const external = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4382/')) external.push(request.url()); });
  for (const path of ['/', '/about-ai/', '/source-to-data/']) {
    await page.goto(path);
    await expect(page.locator('form, iframe, audio, canvas')).toHaveCount(0);
  }
  expect(external).toEqual([]);
  const response = await page.request.post('/api/chat', { data: { messages: [] } });
  expect(response.status()).not.toBe(200);
});

test('capture desktop, mobile and source-example review images', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
  await page.goto('/source-to-data/');
  await page.screenshot({ path: 'test-results/example-mobile.png', fullPage: true });
  for (const [route, name] of [['/methods/linkage/', 'methods'], ['/teaching/', 'teaching'], ['/memorial/', 'memorial'], ['/memorial/queen-mary/', 'queen-mary']]) {
    await page.goto(route);
    await page.screenshot({ path: `test-results/${name}-mobile.png`, fullPage: true });
  }
});

test('teaching pages separate student material, teacher notes and all four real downloads', async ({ page }) => {
  for (const lang of ['en', 'da']) {
    const prefix = lang === 'da' ? '/da' : '';
    for (const [route, filename] of [['/teaching/', `student-worksheet-${lang}.pdf`], ['/teaching/teacher-notes/', `teacher-notes-${lang}.pdf`]]) {
      await page.goto(prefix + route);
      const event = page.waitForEvent('download');
      await page.getByRole('link', { name: /Download printable PDF|Hent PDF til udskrift/ }).click();
      const download = await event;
      expect(download.suggestedFilename()).toBe(filename);
      expect(await download.failure()).toBeNull();
      await expect(page.locator('form, textarea, input')).toHaveCount(0);
    }
  }
});

test('memorial is discoverable and shows corrected sources and uncertainty, not an archival census', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Memorial', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Hans Jonathan (Hans Jónatan)', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Mary Thomas (Queen Mary)', exact: true }).click();
  await expect(page.locator('main')).toContainText('December 1887');
  await expect(page.locator('main')).toContainText('around 1842');
  await expect(page.locator('main')).toContainText('around 1848');
  await page.getByRole('link', { name: 'Dansk', exact: true }).click();
  await expect(page).toHaveURL(/\/da\/memorial\/queen-mary\/$/);
  await expect(page.locator('h1')).toHaveText('Mary Thomas (Queen Mary)');
});
