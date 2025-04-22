/*:
 * @plugindesc Small Extension for FOSSIL so it works on SRD_CharacterGeneratorEX
Put it right under Fossil for now.
 * @author YoraeRasante
 * @target MZ

 * @help Put this plugin bellow FOSSIL, and above SRD_CharacterGeneratorEX

FOSSIL does it best to work as many MV plugins as possible on MZ.
Unfortunatelly, it does not yet have a substitute for CacheMap and LZString
And SRD_CharacterGeneratorEX asks for those two in a way it just cannot
be aliased by an extension under it, only above.
Most other functions that cannot be aliased afterwards like so are already
fixed by Fossil, but not those two.

These are not useable versions of those, but good enough to fool CCEx.
*/

if (Utils.RPGMAKER_NAME === "MZ") {
    if (!CacheMap) function CacheMap() {
        this._items = {};
        this.getItem = function(key) {
            var entry = this._items[key];
            if (entry) return entry;
            return null;
        };
        this.setItem = function (key, item) {
                this._items[key] = item;
        };
    };

    var LZString = LZString || {
        decompressFromBase64:function(e){return e},
        compressToBase64:function(e){return e}
    };
};