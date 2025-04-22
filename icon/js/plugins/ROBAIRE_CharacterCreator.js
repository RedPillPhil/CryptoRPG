/*:
 * @target MZ
 * @plugindesc In-Game Character Creator for RPG Maker MZ — Inspired by CharacterCreatorEX, but MZ native and browser safe.
 * @author ChatGPT
 *
 * @command OpenCharacterCreator
 * @text Open Character Creator
 * @desc Opens the character creator scene for an actor.
 *
 * @arg actorId
 * @type actor
 * @desc The Actor ID you want to customize.
 * @default 1
 *
 * @help 
 * This plugin allows you to create a character customization scene
 * similar to SRD's Character Creator EX but fully compatible with RPG Maker MZ
 * and browser-safe (no Node.js or require calls).
 *
 * Expected image folders:
 * img/CharacterCreatorMZ/walk/
 * img/CharacterCreatorMZ/face/
 * img/CharacterCreatorMZ/sv/
 * img/CharacterCreatorMZ/dead/
 *
 * Usage:
 * Use Plugin Command -> Open Character Creator
 * Select: actorId (example: 1)
 */

(() => {
  const pluginName = "CharacterCreatorMZ";

  let _targetActorId = 1;

  PluginManager.registerCommand(pluginName, "OpenCharacterCreator", args => {
    console.log("🧠 OpenCharacterCreator command triggered!");
    _targetActorId = Number(args.actorId || 1);
    SceneManager.push(window.Scene_CharacterCreator);
  });

  window.Scene_CharacterCreator = class Scene_CharacterCreator extends Scene_MenuBase {
    constructor() {
      super();
      this._currentPartIndex = 0;
      this._availableParts = [];
      this._currentSelection = 0;
    }

    create() {
      super.create();
      console.log("🧠 Scene_CharacterCreator loaded.");
      this.createHelpWindow();
      this.loadPartList();
      this.createListWindow();
      this.createPreviewSprite();
    }

    loadPartList() {
      this._availableParts = ["Body.png", "Outfit1.png", "Outfit2.png", "Hair1.png", "Hair2.png"];
    }

    createListWindow() {
      const rect = new Rectangle(0, this.helpWindow.height, 300, Graphics.height - this.helpWindow.height);
      this._listWindow = new Window_Command(rect);
      this._listWindow.makeCommandList = () => {
        this._availableParts.forEach((file, index) => {
          this._listWindow.addCommand(file, "selectPart", true, index);
        });
      };
      this._listWindow.setHandler("selectPart", this.onSelectPart.bind(this));
      this.addWindow(this._listWindow);
      this._listWindow.refresh();
    }

    createPreviewSprite() {
      this._previewSprite = new Sprite();
      this._previewSprite.x = Graphics.width / 2 - 72;
      this._previewSprite.y = Graphics.height / 2 - 72;
      this.addChild(this._previewSprite);
      this.updatePreview();
    }

    onSelectPart() {
      const partIndex = this._listWindow.currentExt();
      this._currentSelection = partIndex;
      this.updatePreview();
    }

    updatePreview() {
      const partFile = this._availableParts[this._currentSelection];
      const bitmap = ImageManager.loadBitmap("img/CharacterCreatorMZ/walk/", partFile);
      this._previewSprite.bitmap = bitmap;
    }

    terminate() {
      super.terminate();
      const actor = $gameActors.actor(_targetActorId);
      const partName = this._availableParts[this._currentSelection].replace(/\.png$/i, "");
      actor.setCharacterImage(partName, 0);
      actor.setFaceImage(partName, 0);
      $gamePlayer.refresh();
      console.log(`✅ Updated actor ${_targetActorId} with: ${partName}`);
    }
  };

})();
