(async () => {
  const domain = window.location.hostname.replace(/^www\./, '');
  
  // Diese Datei musst du selbst pflegen
  const knownPasskeySites = {
    "github.com": true,
    "google.com": true,
    "passkeys.io": true,
    "icloud.com": true
  };

  if (knownPasskeySites[domain]) {
    showPopover("✅ Diese Seite unterstützt laut passkeys.directory Passkeys");
  } else {
    showPopover("ℹ️ Keine bekannte Passkey-Unterstützung laut passkeys.directory");
  }

  function showPopover(text) {
    const container = document.createElement("div");
    container.innerHTML = `
      <div style="
        position: fixed;
        top: 80px;
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
      ">
        <strong>🔐 Passkey Check</strong><br>${text}
      </div>
    `;
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 8000);
  }
})();
