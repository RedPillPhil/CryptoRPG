/*:
 * @plugindesc Replaces in-game gold with live Bagz token balance [v1.3] 🪙 + wallet connect + player name sync
 * @author GPT
 *
 * @param TokenContract
 * @default 0x666a0210FC8574D7Cc5Ae53717F947348289618c
 *
 * @param TokenSymbol
 * @default BAGZ
 *
 * @param RpcUrl
 * @default https://cloudflare-eth.com
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
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)'
  ];

  let cachedBalance = 'NaN BAGZ (Connect Wallet)';
  let lastCheck = 0;

  // Override gold system
  Game_Party.prototype.gold = function() {
    return 0;
  };

  // Override gold display in menu
  Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    const now = Date.now();
    if (!window[WALLET_VAR] || !window[WALLET_VAR].startsWith('0x')) {
      cachedBalance = 'NaN BAGZ (Connect Wallet)';
    } else if (now - lastCheck > 10000) {
      updateCryptoBalance();
    }
    this.resetTextColor();
    this.drawText(cachedBalance, x, y, width, 'right');
  };

  async function updateCryptoBalance() {
    try {
      const wallet = window[WALLET_VAR];
      if (!wallet || !wallet.startsWith('0x')) {
        cachedBalance = 'NaN BAGZ (Connect Wallet)';
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(TOKEN_CONTRACT, abi, provider);
      const [rawBalance, decimals] = await Promise.all([
        contract.balanceOf(wallet),
        contract.decimals()
      ]);

      const formatted = parseFloat(ethers.utils.formatUnits(rawBalance, decimals)).toFixed(2);
      cachedBalance = `${formatted} ${TOKEN_SYMBOL}`;
      lastCheck = Date.now();
      console.log("Bagz balance updated:", cachedBalance);
    } catch (e) {
      console.error('Error fetching BAGZ balance:', e);
      cachedBalance = 'Error';
    }
  }

  // Wallet connect function for in-game events
  window.connectWallet = async function() {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('MetaMask not found');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      window[WALLET_VAR] = address;
      $gameActors.actor(1).setName(address); // Set wallet address as player name (optional)

      await updateCryptoBalance();

      // Refresh gold window if menu is active
      const scene = SceneManager._scene;
      if (scene && scene instanceof Scene_Menu && scene._goldWindow) {
        scene._goldWindow.refresh();
      }

      console.log("Wallet connected:", address);
    } catch (e) {
      console.error("Failed to connect to MetaMask:", e);
    }
  };
})();
