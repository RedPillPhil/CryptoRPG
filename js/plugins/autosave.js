(() => {
  const AUTO_SAVE_SLOT = 0;
  const AUTO_SAVE_STEPS = 10;

  // === Autosave Condition Check ===
  function canAutosave() {
    return $gameSystem && !$gameSystem.isSaveDisabled?.();
  }

  // === Autosave after X steps ===
  const _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
  Game_Player.prototype.increaseSteps = function() {
    _Game_Player_increaseSteps.call(this);
    if ($gameParty.steps() % AUTO_SAVE_STEPS === 0) {
      if (canAutosave()) {
        DataManager.saveGame(AUTO_SAVE_SLOT)
          .then(() => console.log("Autosaved after 10 steps."))
          .catch(() => console.warn("Autosave failed."));
      }
    }
  };

  // === Autosave after battle ===
  const _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function(result) {
    _BattleManager_endBattle.call(this, result);
    if (canAutosave()) {
      DataManager.saveGame(AUTO_SAVE_SLOT)
        .then(() => console.log("Autosaved after battle."))
        .catch(() => console.warn("Autosave failed."));
    }
  };

  // === Boot Process: Load Autosave or Start New Game ===
  Scene_Boot.prototype.startNormalGame = function () {
  this.checkPlayerLocation();

  const tryAutoLoad = async () => {
    console.log("Checking for autosave...");

    if (StorageManager.exists(0)) {
      console.log("Autosave exists. Trying to load...");

      try {
        await DataManager.loadGame(0);
        console.log("Loaded autosave successfully.");
        $gameSystem.onAfterLoad();
        SceneManager.goto(Scene_Map);
      } catch (e) {
        console.warn("Failed to load autosave. Starting new game.", e);
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
      }
    } else {
      console.log("No autosave found. Starting new game.");
      DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
    }
  };

  setTimeout(() => {
    tryAutoLoad().catch(e => {
      console.error("Auto-load error:", e);
      DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
    });
  }, 500);
};

})();
