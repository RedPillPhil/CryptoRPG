/*:
 * @target MZ
 * @plugindesc Secure Terminal Scene - Triggerable via event for PIN-based access (Cyberpunk style)
 * @author Ash
 * 
 * @help
 * Call with:
 *   SceneManager.push(Scene_SecureTerminal);
 *   SceneManager.prepareNextScene("6069", 3, 12, 8); // pin, mapId, x, y
 */

(() => {
  class Scene_SecureTerminal extends Scene_Base {
    create() {
      super.create();
      this._correctPin = Scene_SecureTerminal._correctPin || "6069";
      this._transferData = Scene_SecureTerminal._transferData || { mapId: 1, x: 0, y: 0 };
      this.createSecureInterface();
    }

    static prepare(pin, mapId, x, y) {
      this._correctPin = pin;
      this._transferData = { mapId, x, y };
    }

    createSecureInterface() {
      const html = `
<div id="secure-terminal" class="glitch-wrapper">
  <div class="terminal-container">
    <div class="glitch-text">SECURE ACCESS TERMINAL</div>
    <input id="pinInput" type="password" placeholder="Enter PIN" maxlength="8" />
    <div class="keypad">
      ${[1,2,3,4,5,6,7,8,9,'CLR',0,'OK'].map(n => `<button class="keypad-btn">${n}</button>`).join('')}
    </div>
    <div class="log" id="access-log"></div>
  </div>
</div>`;

      const style = document.createElement("style");
      style.innerHTML = `
#secure-terminal {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: black;
  color: #00ffcc;
  font-family: monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: opacity 1s;
}
.terminal-container {
  text-align: center;
  border: 2px solid #00ffcc;
  padding: 30px;
  border-radius: 10px;
  background: #001111;
  box-shadow: 0 0 20px #00ffcc;
}
.glitch-text {
  font-size: 1.8em;
  margin-bottom: 20px;
  animation: glitch 1s infinite;
}
@keyframes glitch {
  0% { text-shadow: 2px 0 red; }
  20% { text-shadow: -2px 0 cyan; }
  40% { text-shadow: 2px 0 lime; }
  60% { text-shadow: -2px 0 magenta; }
  80% { text-shadow: 2px 0 blue; }
  100% { text-shadow: 0 0 #00ffcc; }
}
input#pinInput {
  background: black;
  color: #00ffcc;
  border: 1px solid #00ffcc;
  padding: 10px;
  width: 160px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.2em;
}
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}
.keypad-btn {
  padding: 15px;
  font-size: 1.2em;
  background: #003333;
  color: #00ffcc;
  border: 1px solid #00ffcc;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}
.keypad-btn:hover {
  background: #004444;
}
#access-log {
  margin-top: 20px;
  font-size: 0.9em;
  color: #ff0044;
}`;

      document.head.appendChild(style);
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);

      this.setupTerminalLogic();
    }

    setupTerminalLogic() {
      const input = document.getElementById("pinInput");
      const log = document.getElementById("access-log");
      const buttons = document.querySelectorAll(".keypad-btn");
      let entered = "";

      function logAccess(message, color = "#ff0044") {
        log.style.color = color;
        log.textContent = message;
      }

      const handleInput = (value) => {
        if (value === "CLR") {
          entered = "";
          input.value = "";
          logAccess("INPUT CLEARED", "#ffcc00");
        } else if (value === "OK") {
          if (entered === this._correctPin) {
            logAccess("ACCESS GRANTED", "#00ffcc");
            setTimeout(() => this.transferPlayer(), 1000);
          } else {
            logAccess("ACCESS DENIED");
          }
        } else {
          if (entered.length < 8) {
            entered += value;
            input.value = entered;
          }
        }
      };

      buttons.forEach(btn => {
        btn.addEventListener("click", () => handleInput(btn.textContent));
      });
    }

    transferPlayer() {
      const { mapId, x, y } = this._transferData;
      document.getElementById("secure-terminal").style.opacity = "0";
      setTimeout(() => {
        SceneManager.goto(Scene_Map);
        $gamePlayer.reserveTransfer(mapId, x, y, 2, 0);
      }, 500);
    }

    terminate() {
      super.terminate();
      const el = document.getElementById("secure-terminal");
      if (el) el.remove();
    }
  }

  window.Scene_SecureTerminal = Scene_SecureTerminal;
  SceneManager.prepareNextScene = Scene_SecureTerminal.prepare.bind(Scene_SecureTerminal);
})();
