/*:
 * @plugindesc 🩹 Full browser patch: handles process, require, FileManager, and filename issues (Load FIRST) — v2.1
 * @author GPT
 */

(() => {
  console.log("✅ BrowserFixes plugin loaded.");

  // Patch 'process' (used by SRD plugins)
  if (typeof window.process === "undefined") {
    window.process = { platform: 'browser', env: {} };
    console.log("🩹 Patched 'process' for browser");
  }

  // Patch 'require' (used by FOSSIL.js)
  if (typeof window.require === "undefined") {
    window.require = function () {
      console.warn("🩹 Dummy require() called – ignored in browser mode.");
      return {}; // safe fallback
    };
  }

  // Patch FileManager for SRD_CharacterCreatorEX
  if (typeof window.FileManager === "undefined") window.FileManager = {};
  if (typeof FileManager.checkDataExists !== 'function') {
    FileManager.checkDataExists = function (path) {
      console.log(`🩹 FileManager.checkDataExists('${path}') -> true`);
      return true;
    };
  }

  // Force patch Utils.filename directly to avoid FOSSIL crash
  if (typeof window.Utils === "undefined") window.Utils = {};
  Object.defineProperty(Utils, 'filename', {
    get: () => "index.html",
    configurable: true
  });
  console.log("🩹 Patched Utils.filename");

  // Warn on deprecated meta
  window.addEventListener('DOMContentLoaded', () => {
    const meta = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (meta) {
      console.warn("⚠️ Deprecated meta tag. Use 'mobile-web-app-capable' instead.");
    }
  });

  console.log("✅ BrowserFixes v2.1 fully applied!");
})();
