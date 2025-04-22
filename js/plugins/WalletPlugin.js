/*:
 * @plugindesc Replaces in-game gold display with Bagz crypto token balance [v1.1] 🪙
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
 * @desc The global variable name that holds the connected wallet (e.g., window.connectedWallet)
 * @default connectedWallet
 */

(function() {
  const params = PluginManager.parameters('MorphleCryptoGold');

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
      console.error('Error fetching Bagz token balance:', e);
      cachedBalance = 'Error';
    }
  }

  Game_Party.prototype.gold = function() {
    return 0; // Disable RPG Maker's default gold system
  };

  Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    const now = Date.now();
    if (!window[WALLET_VAR] || !window[WALLET_VAR].startsWith('0x')) {
      cachedBalance = 'NaN BAGZ (Connect Wallet)';
    } else if (now - lastCheck > 10000) {
      updateCryptoBalance(); // Refresh every 10 sec
    }

    this.resetTextColor();
    this.drawText(cachedBalance, x, y, width, 'right');
  };
})();
