import puppeteer from 'puppeteer';
import fs from 'fs';

const url = "https://passkeys.directory/";

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle2' });

// Warte explizit, bis die Tabelle geladen ist
await page.waitForSelector("a[href^='https://']");

const domains = await page.$$eval("a[href^='https://']", (links) => {
  const result = {};
  links.forEach(link => {
    try {
      const href = link.getAttribute("href");
      const domain = new URL(href).hostname.replace(/^www\./, "");
      result[domain] = true;
    } catch (_) {}
  });
  return result;
});

await browser.close();

fs.writeFileSync("./sites.json", JSON.stringify(domains, null, 2));
console.log(`✅ ${Object.keys(domains).length} Domains extrahiert.`);
