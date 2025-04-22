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
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)'
  ];

  let cachedBalance = 'NaN BAGZ (Connect Wallet)';
  let lastCheck = 0;

  // Override gold system
  Game_Party.prototype.gold = function() {
    return 0;
  };

  // Override the gold window drawing
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

  // Function to get Bagz token balance
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
    } catch (e) {
      console.error('Error fetching BAGZ balance:', e);
      cachedBalance = 'Error';
    }
  }

  // Expose connectWallet() to RPG Maker via script call
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
      $gameActors.actor(1).setName(address); // Optional: sync with player name
      await updateCryptoBalance();

      // Safe UI refresh
      if (SceneManager._scene && SceneManager._scene._goldWindow) {
        SceneManager._scene._goldWindow.refresh();
      }

      console.log("Wallet connected:", address);
    } catch (e) {
      console.error("Failed to connect to MetaMask:", e);
    }
  };
})();
