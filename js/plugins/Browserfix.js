// BrowserFixes.js
(() => {
  console.log("✅ BrowserFixes plugin loaded.");

  // Patch 'process' and 'require' to prevent Node.js errors
  if (typeof process === 'undefined') {
    window.process = { versions: { node: false }, platform: 'browser' };
    console.log("🩹 Patched 'process' for browser");
  }

  if (typeof require === 'undefined') {
    window.require = function () {
      console.warn("🩹 Dummy require() called – ignored in browser mode.");
      return () => {};
    };
  }

  // Patch node-webkit check used by SRD plugins
  if (!process.versions['node-webkit']) {
    process.versions['node-webkit'] = false;
    console.log("🩹 Patched 'nw' for browser");
  }

  // Patch Utils.filename (used in SRD plugins)
  if (!Utils.filename) {
    Utils.filename = function(url) {
      return url.split('/').pop();
    };
    console.log("🩹 Patched Utils.filename");
  }

  // Patch StorageManager functions to work safely in browser
  if (!StorageManager.isLocalMode) {
    StorageManager.isLocalMode = function () {
      return false; // We're in a browser!
    };
  }

  console.log("✅ BrowserFixes v2.1 fully applied!");
})();
