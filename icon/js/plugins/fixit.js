/*:
 * @target MZ
 * @plugindesc Secure Terminal Title Screen - Cyberpunk Style PIN Login to Start Game
 * @author Ash
 * @help
 * This plugin replaces the default title screen with a custom
 * cyberpunk "Secure Terminal" interface. Enter the correct PIN
 * to start the game directly at Map 001.
 */

(() => {
  const CORRECT_PIN = "0420"; // change this to your desired PIN

  // Override Scene_Title to show our custom interface instead
const _Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function () {
  // DO NOT call the original start logic to prevent default new game setup
  this.createSecureTerminal(); // Only load the custom interface
};


  Scene_Title.prototype.createSecureTerminal = function () {
    if (document.getElementById("secure-terminal")) return;

    const html = `
<div id="secure-terminal" class="glitch-wrapper">
  <div class="terminal-container">
    <div class="glitch-text">SECURE ACCESS TERMINAL</div>
    <input id="pinInput" type="password" placeholder="Enter PIN" maxlength="8" />
    <div class="keypad">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLR', 0, 'OK'].map(n => `
        <button class="keypad-btn">${n}</button>`).join('')}
    </div>
    <div class="log" id="access-log"></div>
  </div>
</div>
    `;

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
}
    `;
    document.head.appendChild(style);
    const div = document.createElement("div");
    div.innerHTML = html;
    document.body.appendChild(div);

    this.setupTerminalLogic();
  };

  Scene_Title.prototype.setupTerminalLogic = function () {
    const input = document.getElementById("pinInput");
    const log = document.getElementById("access-log");
    const buttons = document.querySelectorAll(".keypad-btn");

    let entered = "";

    function logAccess(message, color = "#ff0044") {
      log.style.color = color;
      log.textContent = message;
    }

    function handleInput(value) {
      if (value === "CLR") {
        entered = "";
        input.value = "";
        logAccess("INPUT CLEARED", "#ffcc00");
      } else if (value === "OK") {
        if (entered === CORRECT_PIN) {
          logAccess("ACCESS GRANTED", "#00ffcc");
          startGame();
        } else {
          logAccess("ACCESS DENIED");
        }
      } else {
        if (entered.length < 8) {
          entered += value;
          input.value = entered;
        }
      }
    }

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        handleInput(btn.textContent);
      });
    });
  };

 function startGame() {
  const terminal = document.getElementById("secure-terminal");
  terminal.style.opacity = "0";

  setTimeout(() => {
    // Clean up DOM
    terminal.remove();
    const styleTags = [...document.head.querySelectorAll("style")];
    for (const tag of styleTags) {
      if (tag.innerHTML.includes("#secure-terminal")) {
        tag.remove();
      }
    }

    // Setup new game properly
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);

    // Transfer to desired coordinates
    $gamePlayer.reserveTransfer(2, 9, 7, 2, 0); // Map 2, (9,7), down
  }, 1000);
}


})();
