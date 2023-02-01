const puppeteer = require("puppeteer");
// const { executablePath } = require("puppeteer");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getHandler(trackingNumber) {
  // puppeteer.use(StealthPlugin());
  const chromeConfig = {
    headless: false,
    slowMo: 3,
    defaultViewport: null,
    // devtools: true,
  };
  const browser = await puppeteer.launch(chromeConfig);
  const page = await browser.newPage();
  await page.goto(process.env.ISRAELI_CUSTOMS_URL);

  await page.type("#CargoSearchKey", trackingNumber);
  await page.click("#searchButton");

  try {
    await page.waitForSelector("#ContactDetails", { timeout: 15000 });
    const data = await page.$eval("#ContactDetails", (el) => el.value);
    browser.close();
    return data;
  } catch {
    try {
      await page.waitForSelector("#resultErrorContainer", { timeout: 1000 });
      browser.close();
      return "Package Not Found!";
    } catch {
      browser.close();
      return "Error No.25";
    }
  }
}

// Test Cases
// DRU0059955947Z; - False
// RU0059955947Z - TRUE

module.exports = { getHandler };
