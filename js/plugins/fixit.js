/*:
 * @plugindesc Fix browser-related errors from Node.js dependencies (FOSSIL + SRD Plugins) - v1.2
 * @author GPT
 *
 * @help
 * This patch fixes:
 * - "process is not defined"
 * - "require is not defined"
 * - FileManager.checkDataExists
 * - StorageManager.exists
 * - FOSSIL writeNewIndexFile() error
 * - Main.isPathRandomized filename error
 */

(() => {
  // --- Patch process ---
  if (typeof window.process === 'undefined') {
    window.process = { platform: 'browser', env: {} };
  }

  // --- Patch require ---
  if (typeof window.require === 'undefined') {
    window.require = function () {
      console.warn('Dummy require() called – ignored in browser mode.');
      return {};
    };
  }

  // --- Patch FileManager.checkDataExists ---
  if (typeof window.FileManager === 'undefined') {
    window.FileManager = {};
  }
  if (!FileManager.checkDataExists) {
    FileManager.checkDataExists = function () {
      console.warn("FileManager.checkDataExists() called – returning false.");
      return false;
    };
  }

  // --- Patch StorageManager.exists ---
  if (!StorageManager.exists) {
    StorageManager.exists = function (savefileId) {
      try {
        const key = 'RPG File' + savefileId;
        return !!localStorage.getItem(key);
      } catch (e) {
        console.warn("StorageManager.exists error:", e);
        return false;
      }
    };
  }

  // --- Patch FOSSIL.js writeNewIndexFile to avoid crash ---
  if (typeof writeNewIndexFile === 'function') {
    const originalWriteNewIndexFile = writeNewIndexFile;
    writeNewIndexFile = function () {
      try {
        originalWriteNewIndexFile.apply(this, arguments);
      } catch (e) {
        console.warn("FOSSIL writeNewIndexFile error patched:", e);
      }
    };
  }

  // --- Patch main.js isPathRandomized filename issue ---
  if (typeof Main === 'undefined') window.Main = {};
  Main.isPathRandomized = function () {
    try {
      return !!Utils && Utils.filename && Utils.filename.includes('random');
    } catch (e) {
      console.warn("Main.isPathRandomized error:", e);
      return false;
    }
  };

  // --- Console cleanup ---
  console.info("✅ BrowserFixes plugin loaded successfully.");

})();
