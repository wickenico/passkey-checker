// Gleiche Domain-Erkennung wie in content.js
const knownPasskeySites = {
  "github.com": true,
  "google.com": true,
  "passkeys.io": true,
  "icloud.com": true,
  "dropbox.com": true,
  "passkeys.directory": true
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  const url = new URL(tab.url);
  const domain = url.hostname.replace(/^www\./, '');

  const statusElement = document.getElementById("status");

  if (knownPasskeySites[domain]) {
    statusElement.textContent = `✅ ${domain} unterstützt Passkeys`;
  } else {
    statusElement.textContent = `ℹ️ ${domain} ist nicht in der bekannten Liste`;
  }
});
