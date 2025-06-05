import https from 'https';
import cheerio from 'cheerio';
import fs from 'fs';

const url = "https://passkeys.directory/";

https.get(url, res => {
  let html = "";
  res.on("data", chunk => html += chunk);
  res.on("end", () => {
    const $ = cheerio.load(html);
    const result = {};
    $("a[href^='https://']").each((_, el) => {
      const href = $(el).attr("href");
      try {
        const domain = new URL(href).hostname.replace(/^www\./, "");
        result[domain] = true;
      } catch (_) {}
    });
    fs.writeFileSync("./sites.json", JSON.stringify(result, null, 2));
    console.log(`✅ ${Object.keys(result).length} Domains extrahiert.`);
  });
});
