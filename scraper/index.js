import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from "fs";

const URL = "https://passkeys.directory/";

const html = await fetch(URL).then(res => res.text());
const $ = cheerio.load(html);

const result = {};

$("a[href^='https://']").each((_, el) => {
  const href = $(el).attr("href");
  try {
    const domain = new URL(href).hostname.replace(/^www\./, "");
    result[domain] = true;
  } catch (_) {
    // skip invalid URLs
  }
});

// Speichere als JSON
fs.writeFileSync("./sites.json", JSON.stringify(result, null, 2));
console.log(`✅ ${Object.keys(result).length} Domains extrahiert.`);
