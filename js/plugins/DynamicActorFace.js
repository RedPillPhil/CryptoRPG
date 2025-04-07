(function() {
  const _Window_Message_drawFace = Window_Message.prototype.drawFace;

  Window_Message.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    const actor = $gameParty.leader();
    
    // Safety check
    if (!actor || !ImageManager.loadCreatedFace) {
      return _Window_Message_drawFace.call(this, faceName, faceIndex, x, y, width, height);
    }

    const faceBitmap = ImageManager.loadCreatedFace(actor.actorId());

    // ⬇️ Create on-screen label to show what the plugin is doing
    const label = new Sprite(new Bitmap(400, 48));
    label.bitmap.fontSize = 20;
    label.x = 10;
    label.y = 10;
    label.bitmap.drawText("Checking custom face...", 0, 0, 400, 48, "left");
    SceneManager._scene.addChild(label);

    if (faceBitmap && faceBitmap.isReady && faceBitmap.isReady()) {
      label.bitmap.clear();
      label.bitmap.drawText("✅ Drawing custom face", 0, 0, 400, 48, "left");

      this.contents.blt(faceBitmap, 0, 0, width || 144, height || 144, x, y);
      return;
    } else {
      label.bitmap.clear();
      label.bitmap.drawText("❌ Custom face not found", 0, 0, 400, 48, "left");
    }

    // fallback
    _Window_Message_drawFace.call(this, faceName, faceIndex, x, y, width, height);
  };
})();
