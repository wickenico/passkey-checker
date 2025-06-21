chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tab = tabs[0];
  const url = new URL(tab.url);
  const domain = url.hostname.replace(/^www\./, '');

  const statusElement = document.getElementById("status");

  try {
    const res = await fetch("https://raw.githubusercontent.com/wickenico/passkey-checker/main/scraper/sites.json");
    if (!res.ok) throw new Error("Fehler beim Laden der Domainliste.");

    const knownPasskeySites = await res.json();

    if (knownPasskeySites[domain]) {
      statusElement.textContent = `✅ ${domain} unterstützt Passkeys.`;
    } else {
      statusElement.textContent = `ℹ️ ${domain} ist nicht in der bekannten Liste.`;
    }
  } catch (e) {
    console.error(e);
    statusElement.textContent = "⚠️ Fehler beim Laden der Domainliste.";
  }
});
