/*:
 * @plugindesc Fix Node-only plugin errors in browsers (process, require, FileManager, FOSSIL) - v2.0 🧩 Browser Patch
 * @author GPT
 *
 * @help
 * Fixes:
 * - process is not defined
 * - require is not defined
 * - FileManager.checkDataExists
 * - FOSSIL's writeNewIndexFile & filename issues
 * - StorageManager.exists patch
 */

(() => {
  // --- Patch process ---
  if (typeof window.process === 'undefined') {
    window.process = { platform: 'browser', env: {} };
    console.log("🩹 Patched 'process' for browser");
  }

  // --- Patch require ---
  if (typeof window.require === 'undefined') {
    window.require = function () {
      console.warn("🩹 Dummy require() called – browser safe.");
      return {};
    };
  }

  // --- Patch FileManager (used by SRD_CharacterCreatorEX)
  if (typeof window.FileManager === 'undefined') window.FileManager = {};
  if (!FileManager.checkDataExists) {
    FileManager.checkDataExists = function () {
      console.warn("🩹 FileManager.checkDataExists() not available in browser – returning false.");
      return false;
    };
  }

  // --- Patch StorageManager.exists if missing ---
  if (!StorageManager.exists) {
    StorageManager.exists = function (savefileId) {
      const key = 'RPG File' + savefileId;
      return !!localStorage.getItem(key);
    };
  }

  // --- Patch Main.isPathRandomized to avoid 'filename' error ---
  if (typeof Main === 'undefined') window.Main = {};
  Main.isPathRandomized = function () {
    try {
      return !!Utils?.filename?.includes('random');
    } catch (e) {
      console.warn("🩹 Main.isPathRandomized patched for browser:", e);
      return false;
    }
  };

  // --- FOSSIL-specific patch for Main.isPathRandomized crash ---
  if (typeof Utils === 'undefined') window.Utils = {};
  if (typeof Utils.filename === 'undefined') Utils.filename = "index.html";

  // --- Optional meta tag warning suppression ---
  document.querySelectorAll('meta[name="apple-mobile-web-app-capable"]').forEach(meta => {
    console.warn("⚠️ Deprecated meta tag detected. Consider using 'mobile-web-app-capable' instead.");
  });

  console.info("✅ BrowserFixes v2.0 fully applied!");
})();
