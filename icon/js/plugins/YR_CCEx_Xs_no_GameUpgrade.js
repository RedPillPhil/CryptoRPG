/*:
 * @plugindesc Small Extension for SRD_CharacterGeneratorEX
so ITS extensions do not need SRD_GameUpgrade.
 * @author YoraeRasante
 * @target MZ

 * @help Put this plugin above SRD_SuperToolsEngine.

SRD_CharacterGeneratorEX needs SRD_SuperToolsEngine to work.
Neither of those needs SRD_GameUpgrade.

But both CCEx's extensions, DynamicActors and MessageFaces, do.

Important: this is made with only CCEx and its extensions in mind.
Other plugins that require GameUpgrade may still need it.
*/

var SRD = SRD || {};
if(typeof SRD.GameUpgrade == "undefined") {
    SRD.GameUpgrade = SRD.GameUpgrade || {};
    var Imported = Imported || {};
    Imported["SumRndmDde Game Upgrade"] = Imported["SumRndmDde Game Upgrade"] || 0.01;
    SRD.NotetagGetters = SRD.NotetagGetters || [];
    SRD.Requirements = SRD.Requirements || [];
    SRD.GameUpgrade.isNewNWjs = (Utils.RPGMAKER_NAME == "MZ" || (process.versions['node-webkit'] >= "0.13.0" && Utils.RPGMAKER_VERSION >= "1.6.0"));
    
    GameWindowManager = {};
    GameWindowManager.window = (Utils.RPGMAKER_NAME == "MZ") ? nw.Window.get() : require('nw.gui').Window.get();
    SRD.GameUpgrade.SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        SRD.GameUpgrade.SceneManager_initialize.apply(this, arguments);
        if(Utils.isNwjs()) {
            GameWindowManager.window.on('close', GameWindowManager.onWindowClose);
            if (!SRD.GameUpgrade.isNewNWjs) GameWindowManager.window.on('closed', function() {
                if(SRD.OriginalWindow) {
                    SRD.OriginalWindow.close(true);
                }
            });
        }
    };
    GameWindowManager.onWindowClose = function() {
        this.closeGame();
    };
    GameWindowManager.closeGame = function() {
        if (this.window) this.window.close(true);
        else window.close(true);
    };

    
    SRD.requirePlugin = function(name, filename, requiredname, link, version) {
        if(SRD.pluginExists(name, version)) {
            return false;
        } else {
            SRD.Requirements.push(['plugin', filename, requiredname, link, version]);
            return true;
        }
    };
    SRD.pluginExists = function(name, version) {
        if(Imported[name] === undefined) return false;
        if(version === undefined) {
            return true;
        } else {
            return Imported[name] >= version;
        }
    };

    if (typeof SRD.parse == "undefined") {
        SRD.parse = function(string, parseEverything, deleteBlank) {
            if(typeof(string) !== 'string') return string;
            try {
                var temp = JSON.parse(string);
            } catch(e) {
                if(deleteBlank && string === '') {
                    return undefined;
                }
                return string;
            }
            if(typeof(temp) === 'object') {
                for(var key in temp) {
                    temp[key] = SRD.parse(temp[key], parseEverything, deleteBlank);
                }
                return temp;
            } else {
                return parseEverything ? temp : string;
            }
        };
    };
};