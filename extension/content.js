(async () => {
  const domain = window.location.hostname.replace(/^www\./, '');

  try {
    const res = await fetch("https://raw.githubusercontent.com/wickenico/passkey-checker/main/scraper/sites.json");
    if (!res.ok) throw new Error("Fehler beim Laden der Passkey-Domainliste");

    const knownPasskeySites = await res.json();

    if (knownPasskeySites[domain]) {
      showPopover("✅ Diese Seite unterstützt laut passkeys.directory Passkeys");
    } else {
      showPopover("ℹ️ Keine bekannte Passkey-Unterstützung laut passkeys.directory");
    }
  } catch (e) {
    console.error(e);
    showPopover("⚠️ Fehler beim Laden der Passkey-Liste");
  }

  function showPopover(text) {
    if (document.getElementById("passkey-check-overlay")) return;

    const container = document.createElement("div");
    container.id = "passkey-check-overlay";
    container.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        right: 40px;
        background: white;
        color: black;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 99999;
        font-family: sans-serif;
        font-size: 14px;
        max-width: 320px;
        line-height: 1.5;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong>🔐 Passkey Check</strong>
          <button id="close-passkey-overlay" title="Schließen" style="
            background: none;
            border: none;
            font-size: 16px;
            color: #666;
            cursor: pointer;
            padding: 0;
            margin-left: 12px;
            line-height: 1;
          ">&times;</button>
        </div>
        <div style="margin-top: 8px;">${text}</div>
      </div>
    `;
    document.body.appendChild(container);

    const timeout = setTimeout(() => container.remove(), 5000);
    document.getElementById("close-passkey-overlay").addEventListener("click", () => {
      clearTimeout(timeout);
      container.remove();
    });
  }
})();
