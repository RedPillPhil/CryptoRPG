(function () {
  const _Window_Message_drawFace = Window_Message.prototype.drawFace;

  Window_Message.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    const actor = $gameActors.actor(1); // Always actor 1

    if (actor && ImageManager.loadCreatedFace) {
      const faceBitmap = ImageManager.loadCreatedFace(actor.actorId());

      if (faceBitmap && faceBitmap.isReady && faceBitmap.isReady()) {
        this.contents.blt(faceBitmap, 0, 0, width || 144, height || 144, x, y);
        return;
      }
    }

    _Window_Message_drawFace.call(this, faceName, faceIndex, x, y, width, height);
  };
})();
