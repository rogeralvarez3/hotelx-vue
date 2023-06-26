const puppeteer = require("puppeteer");
async function getReviews(url) {
  const browser = await puppeteer.launch({
    args: ["--disabled-setuid-sandbox", "--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  console.log("waiting for selector");
  await page.waitForSelector(".section-review-text");
}
module.exports = getReviews;
