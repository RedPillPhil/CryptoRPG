/*:
 * @target MZ
 * @plugindesc In-Game Character Creator for RPG Maker MZ — Part Category Window version.
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
 */

(() => {
  const pluginName = "CharacterCreatorMZ";

  let _targetActorId = 1;

  PluginManager.registerCommand(pluginName, "OpenCharacterCreator", args => {
    console.log("🧠 OpenCharacterCreator command triggered!");
    _targetActorId = Number(args.actorId || 1);
    SceneManager.push(Scene_CharacterCreator);
  });

const CharacterPartDatabase = {
  _data: null,

  load() {
    if (this._data) return Promise.resolve(this._data);
    return new Promise(resolve => {
      const url = "img/CharacterCreatorMZ/parts.json";
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this._data = json;
          resolve(json);
	 console.log(`✅ Loaded parts.json:`, json);

        })
        .catch(err => {
          console.error(`⚠️ Failed to load part list from ${url}:`, err);
          this._data = {};
          resolve(this._data);
        });
    });
  },

getList(partCategory) {
  const data = this._data || {};
  const match = Object.keys(data).find(key => key.toLowerCase() === partCategory.toLowerCase());
  return match ? data[match] : [];
}

};




  // === Character Parts Selection Window ===
// === Character Parts Selection Window ===
class Window_CharacterParts extends Window_Command {
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


// === Character Creator Scene ===
class Scene_CharacterCreator extends Scene_MenuBase {
  create() {
    super.create();
    console.log("🧠 Scene_CharacterCreator loaded.");

    this.createPartsWindow();   // your part selection window
    this.createActorPreview();  // your current preview logic (probably empty right now)
    this.createPreviewSprites();  // 💡 new function: for backgrounds & composed sprites
  }

  createPreviewSprites() {
    // Backgrounds
    this._faceBackground = new Sprite(ImageManager.loadPicture('Face-Background'));
    this._svBackground = new Sprite(ImageManager.loadPicture('SV-Background'));
    this._walkBackground = new Sprite(ImageManager.loadPicture('Walk-Background'));

    // Composed images
    this._customFace = new Sprite(ImageManager.loadPicture('CustomFace'));
    this._customCharacter = new Sprite(ImageManager.loadPicture('CustomCharacter'));

    // Position them (adjust as needed!)
    this._faceBackground.x = 400; this._faceBackground.y = 50;
    this._svBackground.x = 400; this._svBackground.y = 50;
    this._walkBackground.x = 400; this._walkBackground.y = 50;
    this._customFace.x = 400; this._customFace.y = 50;
    this._customCharacter.x = 400; this._customCharacter.y = 50;

    // Add them to the scene
    this.addChild(this._faceBackground);
    this.addChild(this._customFace);
    this.addChild(this._svBackground);
    this.addChild(this._customCharacter);
    this.addChild(this._walkBackground);

    // Default visibility (you can customize which show/hide depending on selected category)
    this._faceBackground.visible = true;
    this._customFace.visible = false
    this._svBackground.visible = false;
    this._customCharacter.visible = false;
    this._walkBackground.visible = false;
  }



createActorPreview() {
    this._actor = $gameActors.actor(1); // Your actor

    // === FACE FRAME WINDOW ===
    const faceWindowWidth = ImageManager.faceWidth + 24;
    const faceWindowHeight = ImageManager.faceHeight + 24;
    const faceWindowX = Graphics.width / 2 - faceWindowWidth / 2;
    const faceWindowY = Graphics.height / 2 - faceWindowHeight - 120;

    const faceWindow = new Window_Base(new Rectangle(faceWindowX, faceWindowY, faceWindowWidth, faceWindowHeight));
    this.addChild(faceWindow);

    const faceBitmap = ImageManager.loadFace(this._actor.faceName());
    this._faceSprite = new Sprite(faceBitmap);

    faceBitmap.addLoadListener(() => {
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sx = (this._actor.faceIndex() % 4) * pw;
        const sy = Math.floor(this._actor.faceIndex() / 4) * ph;

        const cropped = new Bitmap(pw, ph);
        cropped.blt(faceBitmap, sx, sy, pw, ph, 0, 0);
        this._faceSprite.bitmap = cropped;

        this._faceSprite.x = faceWindow.x + 12;
        this._faceSprite.y = faceWindow.y + 12;
        this.addChild(this._faceSprite);
    });

    // === CHARACTER SPRITE FRAMES ===
    this._charFrames = [];
    this._charSprites = [];

    const charBitmap = ImageManager.loadCharacter(this._actor.characterName());
    charBitmap.addLoadListener(() => {
        const spriteWidth = charBitmap.width / 12;
        const spriteHeight = charBitmap.height / 8;
        const positions = [
            { dir: 2, xOffset: -100 }, // Front
            { dir: 4, xOffset: 0 },    // Left
            { dir: 8, xOffset: 100 }   // Back
        ];

        positions.forEach((pos, index) => {
            // Create frame window
            const frameWidth = spriteWidth + 24;
            const frameHeight = spriteHeight + 24;
            const frameX = Graphics.width / 2 + pos.xOffset - frameWidth / 2;
            const frameY = Graphics.height / 2 + 60;

            const frame = new Window_Base(new Rectangle(frameX, frameY, frameWidth, frameHeight));
            this.addChild(frame);
            this._charFrames.push(frame);

            // Create sprite
            const pattern = 1; // Standing still frame
            const sx = pattern * spriteWidth;
            const sy = (pos.dir / 2 - 1) * spriteHeight;

            const sprite = new Sprite(new Bitmap(spriteWidth, spriteHeight));
            sprite.bitmap.blt(charBitmap, sx, sy, spriteWidth, spriteHeight, 0, 0);
            sprite.x = frame.x + 12;
            sprite.y = frame.y + 12;
            sprite.anchor.x = 0;
            sprite.anchor.y = 0;

            this.addChild(sprite);
            this._charSprites.push(sprite);
        });
    });
}


    createPartsWindow() {
      const rect = new Rectangle(0, 0, 250, Graphics.boxHeight);
      this._partsWindow = new Window_CharacterParts(rect);
      this._partsWindow.setHandler("ok", this.onPartSelected.bind(this));
      this._partsWindow.setHandler("cancel", this.popScene.bind(this));
      this.addWindow(this._partsWindow);
    }

    createPreviewSprite() {
      this._previewSprite = new Sprite();
      this._previewSprite.x = Graphics.width / 2 - 48;
      this._previewSprite.y = Graphics.height / 2 - 48;
      this.addChild(this._previewSprite);

      // Temporary placeholder image
      const bitmap = ImageManager.loadBitmap("img/CharacterCreatorMZ/walk/", "Body.png");
      this._previewSprite.bitmap = bitmap;
    }

onPartSelected() {
  const partSymbol = this._partsWindow.currentSymbol();
  console.log(`🧠 Now selecting part variation for: ${partSymbol}`);

  const rect = new Rectangle(250, 0, 300, Graphics.boxHeight);
  this._partSelectionWindow = new Window_PartSelection(rect, partSymbol);

  this._partSelectionWindow.setHandler("ok", () => {
    const selectedPart = this._partSelectionWindow.partFilename();
    const actor = $gameActors.actor(_targetActorId);
    actor._characterParts = actor._characterParts || {};
    actor._characterParts[partSymbol] = selectedPart === "None" ? null : selectedPart;
    actor._customCharacterBitmap = null;
    actor._customFaceBitmap = null;

    console.log(`💾 Saved "${selectedPart}" for "${partSymbol}" on actor ${_targetActorId}`);

    this.removeChild(this._partSelectionWindow);  // close the picker
    this._partsWindow.activate();  // return focus
  });

  this._partSelectionWindow.setHandler("cancel", () => {
    this.removeChild(this._partSelectionWindow);  // close the picker
    this._partsWindow.activate();  // return focus
  });

  this.addChild(this._partSelectionWindow);
}


    terminate() {
      super.terminate();
      const actor = $gameActors.actor(_targetActorId);
      actor.setCharacterImage("Actor1", 0);
      actor.setFaceImage("Actor1", 0);
      $gamePlayer.refresh();
      console.log(`✅ Actor ${_targetActorId} updated with placeholder graphics.`);
    }
  }

// Extend Game_Actor to store parts once
const Game_Actor_initialize = Game_Actor.prototype.initialize;
Game_Actor.prototype.initialize = function(actorId) {
  Game_Actor_initialize.call(this, actorId);
  this._characterParts = {};  // Stores selected parts for the character creator
};

Game_Actor.prototype.getCharacterParts = function() {
  return this._characterParts || {};
};

// New: Generate combined map sprite
Game_Actor.prototype.getCustomCharacterBitmap = function() {
  if (!this._customCharacterBitmap) {
    this._customCharacterBitmap = CharacterCreatorManager.buildCharacterBitmap(this.getCharacterParts());
  }
  return this._customCharacterBitmap;
};

// New: Generate combined face sprite
Game_Actor.prototype.getCustomFaceBitmap = function() {
  if (!this._customFaceBitmap) {
    this._customFaceBitmap = CharacterCreatorManager.buildFaceBitmap(this.getCharacterParts());
  }
  return this._customFaceBitmap;
};


const CharacterCreatorManager = {
  buildCharacterBitmap(parts) {
    const bitmap = new Bitmap(144, 192); // standard character size (3 frames wide * 48, 4 rows * 48)

    for (const [category, filename] of Object.entries(parts)) {
      if (!filename) continue;

      const partBitmap = ImageManager.loadBitmap("img/CharacterCreatorMZ/walk/", filename);
      partBitmap.addLoadListener(() => {
        // Composite each part at 0,0 (layered on top of each other)
        bitmap.blt(partBitmap, 0, 0, partBitmap.width, partBitmap.height, 0, 0);
      });
    }
    return bitmap;
  },

  buildFaceBitmap(parts) {
    const bitmap = new Bitmap(ImageManager.faceWidth, ImageManager.faceHeight);

    for (const [category, filename] of Object.entries(parts)) {
      if (!filename) continue;

      const partBitmap = ImageManager.loadBitmap("img/CharacterCreatorMZ/face/", filename);
      partBitmap.addLoadListener(() => {
        bitmap.blt(partBitmap, 0, 0, partBitmap.width, partBitmap.height, 0, 0);
      });
    }
    return bitmap;
  }
};

const _Sprite_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
  // If this character is linked to an actor
  const actor = this._character && this._character.actor && this._character.actor();
  if (actor && actor.getCustomCharacterBitmap) {
    const parts = actor.getCharacterParts();
    if (Object.keys(parts).length > 0) {
      // Use generated custom sprite
      this.bitmap = actor.getCustomCharacterBitmap();
      this._isBigCharacter = true;
      return;
    }
  }

  // Default behavior (use regular character sheet)
  _Sprite_Character_setCharacterBitmap.call(this);
};

const _Window_Base_drawActorFace = Window_Base.prototype.drawActorFace;
Window_Base.prototype.drawActorFace = function(actor, x, y, width, height) {
  if (actor.getCustomFaceBitmap && Object.keys(actor.getCharacterParts()).length > 0) {
    const bitmap = actor.getCustomFaceBitmap();
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, width || bitmap.width, height || bitmap.height);
  } else {
    _Window_Base_drawActorFace.call(this, actor, x, y, width, height);
  }
};

class Window_PartSelection extends Window_Selectable {
  constructor(rect, partCategory) {
    super(rect);
    this._partCategory = partCategory;
    this._partList = [];
    this._imageSprites = [];
    this.refreshParts();
  }

  refreshParts() {
    this._partList = [];
    this._imageSprites.forEach(sprite => this.removeChild(sprite));
    this._imageSprites = [];

    CharacterPartDatabase.load().then(() => {
      const files = CharacterPartDatabase.getList(this._partCategory) || [];
      this._partList = files;

      files.forEach((filename, index) => {
        const nameWithoutExtension = filename.replace(/\.png$/i, "");
        const sprite = new Sprite(ImageManager.loadBitmap(`img/CharacterCreatorMZ/${this._partCategory}/face/`, nameWithoutExtension));
        const col = index % 4;
        const row = Math.floor(index / 4);

        sprite.x = 20 + col * 100;  // adjust layout as needed
        sprite.y = 20 + row * 100;
        sprite.scale.x = sprite.scale.y = 0.5;  // adjust preview size

        this.addChild(sprite);
        this._imageSprites.push(sprite);
      });

      this.createContents();
      this.refresh();
      this.select(0);
      this.activate();
    });
  }

  maxItems() {
    return this._partList.length;
  }

  partFilename() {
    return this._partList[this.index()] || null;
  }

  setPartCategory(category) {
    this._partCategory = category;
    this.refreshParts();
  }
}




  window.Scene_CharacterCreator = Scene_CharacterCreator;
})();
