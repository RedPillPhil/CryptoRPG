/*:
 * @target MZ
 * @plugindesc Connects to MetaMask, sets wallet address as player name, and syncs token balance with gold. [Bagz]
 * @command ConnectWallet
 * @text Connect Wallet
 * @desc Connect to MetaMask and sync wallet address and balance.
 */

(() => {
  console.log("[Bagz] WalletConnect plugin loaded ✅"); // <-- Added this line

  const pluginName = "Bagz_WalletConnect";

  // ====== CONFIG ======
  const tokenAddress = "0x6666666666666666666666666666666666666666"; // Your token
  const tokenAbi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];
  const baseRpc = "https://mainnet.base.org"; // Or your custom Base RPC
  // ====================

  PluginManager.registerCommand(pluginName, "ConnectWallet", async function () {
    console.log("[Bagz] Triggered ConnectWallet");

    if (typeof window.ethereum === "undefined") {
      console.error("[Bagz] MetaMask not found.");
      $gameMessage.add("MetaMask is not installed.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // === Set Player Name to Wallet Address
      console.log("[Bagz] Wallet connected:", address);
      const actor = $gameParty.leader();
      if (actor) {
        actor.setName(address);
      }

      // === Display Wallet Address
      $gameMessage.add(`Connected Wallet:\n${address}`);

      // === Fetch Token Balance
      const baseProvider = new ethers.providers.JsonRpcProvider(baseRpc);
      const contract = new ethers.Contract(tokenAddress, tokenAbi, baseProvider);

      const rawBalance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      const humanBalance = Number(ethers.utils.formatUnits(rawBalance, decimals));

      console.log("[Bagz] Token Balance:", humanBalance);

      // === Set RPG Maker Gold to Token Balance
      $gameParty._gold = Math.floor(humanBalance);

      // Optionally show balance
      $gameMessage.add(`Token Balance: ${humanBalance}`);

    } catch (err) {
      console.error("[Bagz] Connection failed:", err);
      $gameMessage.add("Failed to connect to MetaMask.");
    }
  });
})();
