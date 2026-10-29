import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import { projects } from '../src/content.ts';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith('https://api.github.com/')) console.log('Live GitHub status:', response.status());
  });
  await page.goto('http://127.0.0.1:5173/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.querySelector('.repository-section [aria-busy]')?.getAttribute('aria-busy') === 'false');
  console.log('Repository UI:', await page.locator('.repository-section').innerText());
  for (const project of projects) {
    const response = await page.request.get(project.url);
    console.log(`Project link ${project.name}:`, response.status());
  }
  await page.screenshot({ path: 'artifacts/desktop.png' });
  for (let top = 0; top < await page.evaluate(() => document.body.scrollHeight); top += 600) {
    await page.evaluate(value => window.scrollTo({ top: value, behavior: 'instant' }), top);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts/mobile.png' });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'artifacts/mobile-menu.png' });
  await page.keyboard.press('Escape');
  await page.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true });
  console.log('Browser page errors:', errors);
  if (errors.length) throw new Error('The browser reported page errors.');

  const font = (await readFile('public/manrope-latin-wght-normal.woff2')).toString('base64');
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`<!doctype html><html lang="en"><head><style>
    @font-face { font-family: Manrope; src: url(data:font/woff2;base64,${font}); font-weight: 200 700; }
    * { box-sizing: border-box; } body { margin: 0; background: #181818; color: #f2f2e9; font-family: Manrope, sans-serif; width: 1200px; height: 630px; padding: 64px; }
    header { display: flex; gap: 16px; align-items: center; font-size: 20px; line-height: 28px; } .mark { color: #d5e9a5; font-size: 48px; line-height: 1; font-weight: 600; letter-spacing: -.08em; }
    main { position: relative; margin-top: 64px; } h1 { font-size: 72px; line-height: 1; font-weight: 500; letter-spacing: -.06em; margin: 0; } .dot { color: #d5e9a5; } p { color: #a1a19b; font-size: 20px; line-height: 28px; margin-top: 32px; }
    .symbol { position: absolute; right: 0; top: 0; width: 192px; height: 192px; display: grid; place-items: center; border: 1px solid #d5e9a544; border-radius: 50%; font-size: 72px; color: #d5e9a5; }
    footer { margin-top: 64px; display: flex; justify-content: space-between; font-size: 14px; line-height: 20px; color: #a1a19b; }
    </style></head><body><header><span class="mark">s.</span>Sunghyun Kim</header><main><h1>Thoughtful code.<br>Useful products<span class="dot">.</span></h1><p>Connecting backend engineering, AI, and data.</p><div class="symbol">↗</div></main><footer><span>Developer portfolio</span><span>Seoul, South Korea</span></footer></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/social-preview.png' });
  console.log('Screenshots saved in artifacts/. Social preview saved in public/.');
} finally {
  await browser.close();
}
