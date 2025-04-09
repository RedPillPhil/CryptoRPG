/*:
 * @target MZ
 * @plugindesc Replaces the title screen with an external webpage for a custom menu.
 * @author GPT
 * 
 * @help This plugin redirects the game to a custom webpage instead of showing the default title screen.
 * 
 * You must host the webpage externally (e.g., GitHub Pages, your domain).
 */

(() => {
  const customMenuURL = "https://bagholderz.com/Title/index.html";

  const _Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function () {
    window.location.href = customMenuURL;
  };
})();
