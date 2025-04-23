/*:
 * @target MZ
 * @plugindesc Character Creator EX - Full Conversion for RPG Maker MZ (Standalone) | Original by SRD, Port by ChatGPT
 * @author SumRndmDde (Converted by ChatGPT)
 *
 * @command OpenCharacterCreator
 * @text Open Character Creator
 * @desc Opens the Character Creator scene for a specific actor.
 *
 * @arg actorId
 * @type actor
 * @desc The ID of the actor to customize.
 * @default 1
 */

(() => {
  const pluginName = "CharacterCreatorEX_MZ_Full";

  let _targetActorId = 1;

  PluginManager.registerCommand(pluginName, "OpenCharacterCreator", args => {
    _targetActorId = Number(args.actorId || 1);
    SceneManager.push(Scene_CharacterCreator);
  });

  class Scene_CharacterCreator extends Scene_MenuBase {
    create() {
      super.create();
      this.createPartCategoryWindow();
      this.createPartSelectionWindow();
      this.createPreviewSprites();
      this.refreshPreview();
    }

    createPartCategoryWindow() {
      const rect = new Rectangle(0, 0, 250, Graphics.boxHeight);
      this._categoryWindow = new Window_PartCategory(rect);
      this._categoryWindow.setHandler("ok", this.onPartCategorySelected.bind(this));
      this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
      this.addWindow(this._categoryWindow);
    }

    createPartSelectionWindow() {
      const rect = new Rectangle(250, 0, 300, Graphics.boxHeight);
      this._selectionWindow = new Window_PartSelection(rect);
      this._selectionWindow.setHandler("ok", this.onPartSelected.bind(this));
      this._selectionWindow.setHandler("cancel", this.onPartSelectionCancel.bind(this));
      this.addWindow(this._selectionWindow);
      this._selectionWindow.deactivate();
    }

    createPreviewSprites() {
      this._faceBackground = new Sprite(ImageManager.loadBitmap("img/CharacterCreatorMZ/", "Face-Background"));
      this._customFace = new Sprite();
      this._svBackground = new Sprite(ImageManager.loadBitmap("img/CharacterCreatorMZ/", "SV-Background"));
      this._customCharacter = new Sprite();
      this._walkBackground = new Sprite(ImageManager.loadBitmap("img/CharacterCreatorMZ/", "Walk-Background"));

      const centerX = Graphics.width / 2;
      const centerY = Graphics.height / 2;

      [this._faceBackground, this._customFace, this._svBackground, this._customCharacter, this._walkBackground]
        .forEach(sprite => {
          sprite.x = centerX;
          sprite.y = centerY;
          sprite.anchor.set(0.5, 0.5);
          this.addChild(sprite);
        });
    }

    onPartCategorySelected() {
      const partCategory = this._categoryWindow.currentSymbol();
      this._selectionWindow.setPartCategory(partCategory);
      this._selectionWindow.activate();
      this._selectionWindow.select(0);
    }

    onPartSelected() {
      const actor = $gameActors.actor(_targetActorId);
      const part = this._selectionWindow.currentPartFile();
      const category = this._selectionWindow.getPartCategory();
      actor.setCharacterPart(category, part);
      console.log(`Saved part: ${part} to category: ${category}`);
      this.refreshPreview();
      this._selectionWindow.deactivate();
      this._categoryWindow.activate();
    }

    onPartSelectionCancel() {
      this._selectionWindow.deactivate();
      this._categoryWindow.activate();
    }

    refreshPreview() {
      const actor = $gameActors.actor(_targetActorId);
      const parts = actor.getCharacterParts();

      this._customFace.bitmap = new Bitmap(ImageManager.faceWidth, ImageManager.faceHeight);
      this._customCharacter.bitmap = new Bitmap(144, 192);

      for (const [category, filename] of Object.entries(parts)) {
        if (!filename) continue;

        const facePart = ImageManager.loadBitmap("img/CharacterCreatorMZ/face/", filename);
        facePart.addLoadListener(() => {
          this._customFace.bitmap.blt(facePart, 0, 0, facePart.width, facePart.height, 0, 0);
        });

        const walkPart = ImageManager.loadBitmap("img/CharacterCreatorMZ/walk/", filename);
        walkPart.addLoadListener(() => {
          this._customCharacter.bitmap.blt(walkPart, 0, 0, walkPart.width, walkPart.height, 0, 0);
        });
      }
    }
  }

  class Window_PartCategory extends Window_Command {
    makeCommandList() {
      this.addCommand("Body", "Body");
      this.addCommand("Eyes", "Eyes");
      this.addCommand("Eyebrows", "Eyebrows");
      this.addCommand("Nose", "Nose");
      this.addCommand("Mouth", "Mouth");
      this.addCommand("Clothing", "Clothing");
      this.addCommand("Front Hair", "Front Hair");
      this.addCommand("Rear Hair", "Rear Hair");
      this.addCommand("Accessory A", "Accessory A");
      this.addCommand("Accessory B", "Accessory B");
      this.addCommand("Glasses", "Glasses");
      this.addCommand("Beast Ears", "Beast Ears");
      this.addCommand("Wing", "Wing");
      this.addCommand("Tail", "Tail");
    }
  }

  class Window_PartSelection extends Window_Command {
    constructor(rect) {
      super(rect);
      this._partCategory = null;
    }

    setPartCategory(category) {
      this._partCategory = category;
      this.refresh();
    }

    makeCommandList() {
      if (!this._partCategory) return;
      const parts = $dataParts[this._partCategory] || [];
      this.addCommand("None", null);
      parts.forEach(file => this.addCommand(file.replace(".png", ""), file));
    }

    currentPartFile() {
      return this.currentSymbol();
    }

    getPartCategory() {
      return this._partCategory;
    }
  }

  const _Game_Actor_initialize = Game_Actor.prototype.initialize;
  Game_Actor.prototype.initialize = function(actorId) {
    _Game_Actor_initialize.call(this, actorId);
    this._characterParts = {};
  };

  Game_Actor.prototype.setCharacterPart = function(category, filename) {
    this._characterParts = this._characterParts || {};
    this._characterParts[category] = filename;
  };

  Game_Actor.prototype.getCharacterParts = function() {
    return this._characterParts || {};
  };

  window.Scene_CharacterCreator = Scene_CharacterCreator;
})();