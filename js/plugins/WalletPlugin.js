(function waitForWindowMenuGold() {
  if (typeof Window_MenuGold === "undefined") {
    setTimeout(waitForWindowMenuGold, 50); // wait and try again
    return;
  }

  // ⚙️ Your plugin logic starts here after it's safe to run
  const parameters = PluginManager.parameters("MorphleTokenGoldPlugin");

  const TOKEN_CONTRACT = parameters["TokenContract"] || "0x666a0210FC8574D7Cc5Ae53717F947348289618c";
  const TOKEN_SYMBOL = parameters["TokenSymbol"] || "$MORPHLE";
  const RPC_URL = parameters["RpcUrl"] || "https://cloudflare-eth.com";
  const WALLET_GLOBAL = parameters["WalletGlobalVar"] || "connectedWallet";

  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(TOKEN_CONTRACT, abi, provider);

  let cachedBalance = null;
  let lastFetchTime = 0;
  const CACHE_DURATION = 10000;

  async function fetchBalance() {
    const wallet = window[WALLET_GLOBAL];
    if (!wallet || !/^0x[a-fA-F0-9]{40}$/.test(wallet)) return "Connect Wallet";

    try {
      const now = Date.now();
      if (cachedBalance && now - lastFetchTime < CACHE_DURATION) return cachedBalance;

      const raw = await contract.balanceOf(wallet);
      const dec = await contract.decimals();
      const balance = parseFloat(ethers.utils.formatUnits(raw, dec)).toFixed(4);

      cachedBalance = `${balance} ${TOKEN_SYMBOL}`;
      lastFetchTime = now;
      return cachedBalance;
    } catch (err) {
      console.error("Failed to fetch token balance:", err);
      return "Error";
    }
  }

  const _Window_MenuGold_drawCurrencyValue = Window_MenuGold.prototype.drawCurrencyValue;
  Window_MenuGold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    this.drawText("Loading...", x, y, width, "right");
    fetchBalance().then(balanceText => {
      this.contents.clear();
      this.drawText(balanceText, x, y, width, "right");
    });
  };
})();
