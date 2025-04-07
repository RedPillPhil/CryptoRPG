/*:
 * @plugindesc 🩹 Patches Node.js-specific issues for browser environments. Load FIRST in Plugin Manager.
 * @author GPT
 */

(() => {
  console.log("✅ BrowserFixes plugin loaded.");

  // 🩹 Patch for `process` (used by SRD_GameUpgrade, SRD_SuperToolsEngine)
  if (typeof window.process === "undefined") {
    window.process = {
      platform: 'browser',
      env: {}
    };
    console.log("🩹 Patched 'process' for browser");
  }

  // 🩹 Dummy `require` for FOSSIL.js and others
  if (typeof window.require === "undefined") {
    window.require = function () {
      console.warn("Dummy require() called – ignored in browser mode.");
      return {}; // return empty object so scripts don't crash
    };
  }

  // 🩹 Patch Utils.filename for FOSSIL
  if (typeof Utils === 'undefined') window.Utils = {};
  Object.defineProperty(Utils, 'filename', {
    get: () => "index.html",
    configurable: true
  });

  // 🩹 Patch missing FileManager method used in SRD_CharacterCreatorEX
  if (typeof FileManager === 'undefined') window.FileManager = {};
  if (typeof FileManager.checkDataExists !== 'function') {
    FileManager.checkDataExists = function (path) {
      console.log(`🩹 checkDataExists called for ${path}, assuming true.`);
      return true;
    };
  }

  // 🩹 Warn about deprecated meta tags
  window.addEventListener('DOMContentLoaded', () => {
    const meta = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (meta) {
      console.warn("⚠️ Deprecated meta tag detected. Consider using 'mobile-web-app-capable' instead.");
    }
  });

  console.log("✅ BrowserFixes v2.0 fully applied!");
})();
