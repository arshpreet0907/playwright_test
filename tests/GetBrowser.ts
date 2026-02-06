import { chromium, firefox, webkit, Browser } from '@playwright/test';

export async function getBrowser(browserName: string): Promise<Browser | null> {
  let browser: Browser | null = null;

  if (browserName === "chromium") {
    browser = await chromium.launch({ headless: false });
  }
  if (browserName === "firefox") {
    browser = await firefox.launch({ headless: false });
  }
  if (browserName === "webkit") {
    browser = await webkit.launch({ headless: false });
  }

  return browser;
}