/*
 * Plugin Name: BrowserSafePatch
 * Description: Patches common Node.js-related plugin issues for browser deployment.
 * Use this plugin if you're deploying your RPG Maker MZ project to a browser.
 * It neutralizes references to process, require, and other Node-only objects.
 */

(() => {
    // Suppress undefined 'process' references
    if (typeof process === 'undefined') {
        window.process = {}; // Fake process object
    }

    // Suppress undefined 'require' references
    if (typeof require === 'undefined') {
        window.require = function() {
            console.warn("'require' is not supported in browser. Returning dummy module.");
            return {};
        };
    }

    // Patch SRD.FileManager placeholder (for SRD_CharacterCreatorEX)
    if (!window.SRD || !SRD.FileManager) {
        window.SRD = window.SRD || {};
        SRD.FileManager = SRD.FileManager || {
            checkDataExists: function() {
                console.warn("SRD.FileManager.checkDataExists is not supported in browser.");
                return false;
            }
        };
    }

    // Optional: Patch StorageManager.exists for compatibility
    if (StorageManager && !StorageManager.exists) {
        StorageManager.exists = function(savefileId) {
            try {
                const data = localStorage.getItem(this.savefileKey(savefileId));
                return !!data;
            } catch (e) {
                console.warn("StorageManager.exists error:", e);
                return false;
            }
        };
    }
})();
