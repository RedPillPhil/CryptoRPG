/*:
 * @plugindesc Replaces in-game gold with live Bagz token balance + wallet connect + debug logs [v1.3] 🪙
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

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        window[WALLET_VAR] = accounts[0];
        console.log("[Bagz] Wallet connected:", accounts[0]);
        $gameParty.setName(accounts[0]);
        updateCryptoBalance();
      } catch (err) {
        console.error("[Bagz] MetaMask error:", err);
      }
    } else {
      console.warn("[Bagz] MetaMask not detected.");
    }
  }

  async function updateCryptoBalance() {
    try {
      const wallet = window[WALLET_VAR];
      console.log("[Bagz] Checking balance for wallet:", wallet);

      if (!wallet || !wallet.startsWith('0x')) {
        cachedBalance = 'NaN BAGZ (Connect Wallet)';
        console.warn("[Bagz] No wallet connected.");
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(TOKEN_CONTRACT, abi, provider);

      const rawBalance = await contract.balanceOf(wallet);
      const decimals = await contract.decimals();

      const formatted = parseFloat(ethers.utils.formatUnits(rawBalance, decimals)).toFixed(2);
      cachedBalance = `${formatted} ${TOKEN_SYMBOL}`;
      lastCheck = Date.now();

      console.log("[Bagz] New token balance:", cachedBalance);
    } catch (e) {
      console.error("[Bagz] Failed to fetch token balance:", e);
      cachedBalance = 'Error';
    }
  }

  // Override gold display
  Window_Gold.prototype.drawCurrencyValue = function(value, unit, x_
