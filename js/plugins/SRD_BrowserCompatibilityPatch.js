/*:
 * @target MZ
 * @plugindesc Patches SRD plugins and RPG Maker MZ core for browser compatibility. v1.0
 * @author ChatGPT
 *
 * @help This plugin allows certain SRD plugins that rely on Node.js/NW.js
 * features to work in browser deployments by providing dummy shims and patches.
 *
 * Includes patches for:
 * - SRD.requirePlugin
 * - Utils.isOptionValid
 * - require()
 * - process
 * - nw
 * - FileManager.checkDataExists
 * - Suppresses crashing FS-related SRD code
 */

(() => {
  console.log("✅ BrowserSRDPatchPack loaded.");

  // Patch SRD.requirePlugin
  if (!window.SRD) window.SRD = {};
  if (!SRD.requirePlugin) {
    SRD.requirePlugin = function(name) {
      console.warn(`[BrowserPatch] SRD.requirePlugin('${name}') bypassed.`);
      return true;
    };
  }

  // Patch Utils.isOptionValid
  Utils.isOptionValid = function(name) {
    return location.search.slice(1).split('&').includes(name);
  };

  // Patch require()
  if (!window.require) {
    window.require = function(module) {
      console.warn(`[BrowserPatch] require('${module}') called – dummy returned.`);
      return {};
    };
  }

  // Patch process
  if (!window.process) {
    window.process = { versions: { node: 'browser' } };
  }

  // Patch nw
  if (!window.nw) {
    window.nw = {};
  }

  // Patch FileManager.checkDataExists if used
  if (typeof FileManager !== 'undefined') {
    FileManager.checkDataExists = function() {
      console.warn("[BrowserPatch] FileManager.checkDataExists bypassed.");
      return false;
    };
  }

  // Patch filename reference crash in FOSSIL and SRD
  if (!Utils.filename) {
    Utils.filename = function(url) {
      const parts = url.split("/");
      return parts[parts.length - 1];
    };
    console.log("🩹 Patched Utils.filename");
  }
})();
