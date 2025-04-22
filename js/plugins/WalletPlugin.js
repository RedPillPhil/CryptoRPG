/*:
 * @plugindesc Replaces in-game gold with live Bagz token balance [v1.2] 🪙 + wallet connect + player name sync
 * @author GPT
 *
 * @param TokenContract
 * @default 0x666a0210FC8574D7Cc5Ae53717F947348289618c
 *
 * @param TokenSymbol
 * @default BAGZ
 *
 * @param RpcUrl
 * @default https://base.llamarpc.com
 *
 * @param WalletVar
 * @default connectedWallet
 */

(function() {
  const params = PluginManager.parameters('BagzCryptoGold');
  const TOKEN_CONTRACT = params['TokenContract'];
  const TOKEN_SYMBOL = params['TokenSymbol'] || 'BAGZ';
  const RPC_URL = params['RpcUrl'];
  const WALLET_VAR = params['WalletVar'];

  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];

  let cachedBalance = 'NaN BAGZ (Connect Wallet)';
  let lastCheck = 0;

  // Connect Wallet Function
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        window[WALLET_VAR] = accounts[0];
        console.log("[Bagz] Wallet connected:", accounts[0]);
        $gameParty.setName(accounts[0]); // Optional: sets party name to wallet
        updateCryptoBalance();
      } catch (err) {
        console.error("[Bagz] MetaMask connection error:", err);
      }
    } else {
      console.warn("[Bagz] MetaMask not detected.");
    }
  }

  // Fetch Token Balance
  async function updateCryptoBalance() {
    try {
      const wallet = window[WALLET_VAR];
      console.log("[Bagz] Wallet:", wallet);

      if (!wallet || !wallet.startsWith('0x')) {
        cachedBalance = 'NaN BAGZ (Connect Wallet)';
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      console.log("[Bagz] Using RPC:", RPC_URL);

      const contract = new ethers.Contract(TOKEN_CONTRACT, abi, provider);
      console.log("[Bagz] Contract loaded:", TOKEN_CONTRACT);

      const rawBalance = await contract.balanceOf(wallet);
      const decimals = await contract.decimals();

      console.log("[Bagz] Raw Balance:", rawBalance.toString());
      console.log("[Bagz] Decimals:", decimals);

      const formatted = parseFloat(ethers.utils.formatUnits(rawBalance, decimals)).toFixed(2);
      cachedBalance = `${formatted} ${TOKEN_SYMBOL}`;
      lastCheck = Date.now();

      console.log("[Bagz] Final:", cachedBalance);
    } catch (e) {
      console.error("[Bagz] Error fetching balance:", e);
      cachedBalance = 'Error';
    }
  }

  // Patch Gold Window Display
  const _Window_Gold_drawCurrencyValue = Window_Gold.prototype.drawCurrencyValue;
  Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    const text = cachedBalance || 'NaN BAGZ (Connect Wallet)';
    this.resetTextColor();
    this.drawText(text, x, y, width - this.textPadding(), 'right');
  };

  // Hook into Scene Boot for auto-connection testing (optional)
  const _Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    _Scene_Title_start.call(this);
    console.log("[Bagz] Starting Scene_Title... attempting wallet check.");
    if (!window[WALLET_VAR]) connectWallet();
  };

  // Expose connectWallet for in-game use (like event command: Script → connectWallet(); )
  window.connectWallet = connectWallet;

})();
