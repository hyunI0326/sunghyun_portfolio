import { test, expect } from '@playwright/test';

const repositories = [{ name: 'useful_tool', description: 'A useful project.', language: 'TypeScript', html_url: 'https://github.com/hyunI0326/useful_tool', fork: false }];

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', route => route.fulfill({ json: repositories }));
});

test('renders the portfolio with no page errors or horizontal overflow', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Thoughtful code.Useful products.');
  await expect(page.locator('.project')).toHaveCount(3);
  await expect(page.locator('.faq-item')).toHaveCount(6);
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.screenshot({ path: testInfo.outputPath(`viewport-${width}.png`) });
    await expect.poll(() => page.evaluate(() => ({ width: window.innerWidth, actual: document.documentElement.scrollWidth, overflowing: Array.from(document.querySelectorAll('body *')).filter(element => element.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(element).position !== 'fixed').map(element => `${element.tagName}.${element.className}`).slice(0, 12) }))).toEqual({ width, actual: width, overflowing: [] });
  }
  expect(errors).toEqual([]);
  expect(await page.locator('a[href="#"]').count()).toBe(0);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
});

test('keyboard skip link focuses the main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('mobile menu traps focus, closes with Escape, and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await page.getByRole('dialog').getByRole('link', { name: 'hyunhyun0326@gmail.com' }).focus();
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.querySelector('dialog')?.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Work' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await expect(page.locator('.nav-link[href="#work"]')).toHaveAttribute('aria-current', 'location');
});

test('contact form validates fields before preparing an email draft', async ({ page }) => {
  await page.goto('/#contact');
  const form = page.locator('form');
  await form.getByRole('button', { name: 'Let’s talk' }).click();
  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  await expect(form.getByLabel('Your name')).toBeFocused();
  await form.getByLabel('Your name').fill('Sunghyun Kim');
  await form.getByLabel('Email address').fill('invalid@');
  await form.getByLabel('What are you thinking about?').fill('I would like to discuss a project.');
  await form.getByRole('button', { name: 'Let’s talk' }).click();
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  await expect(form.getByLabel('Email address')).toBeFocused();
  await form.getByLabel('Email address').fill('you@example.com');
  const requests: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') requests.push(request.url()); });
  await form.getByRole('button', { name: 'Let’s talk' }).click();
  await expect(form.getByRole('status')).toContainText('Your draft is ready.');
  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(0);
  expect(requests).toEqual([]);
});

test('GitHub loading, failure, retry, and success states', async ({ page }) => {
  await page.unroute('https://api.github.com/**');
  let fail = true;
  await page.route('https://api.github.com/**', async route => {
    if (fail) await route.fulfill({ status: 503, json: {} });
    else await route.fulfill({ json: repositories });
  });
  await page.goto('/');
  await page.locator('.repository-section').scrollIntoViewIfNeeded();
  await expect(page.getByText('Recent repositories couldn’t load.', { exact: false })).toBeVisible();
  fail = false;
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page.locator('.repo-card h4')).toHaveText('useful tool');
  await expect(page.locator('.repository-section [aria-busy]')).toHaveAttribute('aria-busy', 'false');
});

test('GitHub empty and untrusted response states remain safe', async ({ page }) => {
  await page.unroute('https://api.github.com/**');
  await page.route('https://api.github.com/**', route => route.fulfill({ json: [null, { name: 'unsafe', html_url: 'javascript:alert(1)' }] }));
  await page.goto('/');
  await page.locator('.repository-section').scrollIntoViewIfNeeded();
  await expect(page.getByText('No additional public repositories to show yet.')).toBeVisible();
  await expect(page.locator('a[href^="javascript:"]')).toHaveCount(0);
});

test('repository loading shows layout shaped skeletons until data arrives', async ({ page }) => {
  await page.unroute('https://api.github.com/**');
  let release = () => {};
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('https://api.github.com/**', async route => {
    await gate;
    await route.fulfill({ json: repositories });
  });
  await page.goto('/');
  await expect(page.locator('.repository-section [aria-busy]')).toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('.skeleton')).toHaveCount(3);
  release();
  await expect(page.locator('.repo-card h4')).toHaveText('useful tool');
  await expect(page.locator('.skeleton')).toHaveCount(0);
});

test('word reveal progresses in reading order as the page scrolls', async ({ page }) => {
  await page.goto('/');
  const result = await page.evaluate(async () => {
    const section = document.querySelector('.tagline-section')!;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const words = Array.from(section.querySelectorAll('[data-word]'));
    const snapshots: boolean[][] = [];
    for (const step of [0.6, 0.35, 0.05, -0.3]) {
      window.scrollTo({ top: top - window.innerHeight * step, behavior: 'instant' });
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      snapshots.push(words.map(word => word.classList.contains('word-visible')));
    }
    return { snapshots, count: words.length };
  });
  for (const snapshot of result.snapshots) {
    const firstMuted = snapshot.indexOf(false);
    if (firstMuted !== -1) expect(snapshot.slice(firstMuted).every(value => !value)).toBe(true);
  }
  const counts = result.snapshots.map(snapshot => snapshot.filter(Boolean).length);
  expect(counts.some(count => count > 0 && count < result.count)).toBe(true);
  expect(counts.at(-1)).toBe(result.count);
});

test('reduced motion keeps content visible without movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.hero-copy').evaluate(element => getComputedStyle(element).transform)).toBe('none');
  expect(await page.locator('[data-word]').first().evaluate(element => getComputedStyle(element).opacity)).toBe('1');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('legal pages and the branded 404 provide a route back', async ({ page }) => {
  for (const [path, title] of [['/privacy', 'Your privacy matters.'], ['/terms', 'A few simple terms.'], ['/unknown-page', 'A little off the path.']]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await page.getByRole('link', { name: 'Back to the portfolio' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Thoughtful code.Useful products.');
  }
});
