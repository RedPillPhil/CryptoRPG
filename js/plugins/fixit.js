/*:
 * @plugindesc Browser Compatibility Fixes for Node-based plugins (SRD + FOSSIL) - v1.1
 * @author GPT
 *
 * @help
 * This patch prevents runtime errors in HTML deployment caused by plugins expecting
 * Node.js features like `process`, `require`, or missing RPG Maker MV interfaces.
 */

(() => {
  // Simulate 'process' for plugins like SRD_GameUpgrade
  if (typeof process === 'undefined') {
    window.process = { platform: 'browser', env: {} };
  }

  // Simulate 'require' to prevent FOSSIL-related crashes
  if (typeof require === 'undefined') {
    window.require = function () {
      console.warn('Dummy require() called – ignored in browser mode.');
      return {};
    };
  }

  // Stub for FileManager.checkDataExists used in SRD_CharacterCreatorEX
  if (!window.FileManager) window.FileManager = {};
  if (!FileManager.checkDataExists) {
    FileManager.checkDataExists = function (path) {
      console.warn(`FileManager.checkDataExists(${path}) was called – returning false in browser.`);
      return false;
    };
  }

  // Patch for StorageManager.exists not being a function
  if (!StorageManager.exists) {
    StorageManager.exists = function (savefileId) {
      try {
        const key = StorageManager.localFileDirectoryPath() + "file" + savefileId + ".rpgsave";
        return !!localStorage.getItem(key);
      } catch (e) {
        console.warn("StorageManager.exists failed:", e);
        return false;
      }
    };
  }

  // Patch for Main.isPathRandomized (main.js error on filename)
  if (!Main) window.Main = {};
  if (!Main.isPathRandomized) {
    Main.isPathRandomized = function () {
      return false; // Assume it's not randomized in browser
    };
  }
})();
