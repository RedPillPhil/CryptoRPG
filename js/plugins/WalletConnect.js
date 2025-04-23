/*:
 * @target MZ
 * @plugindesc Connects to MetaMask and fetches wallet address and token balance to replace in-game gold.
 * @author Bagz
 *
 * @command ConnectWallet
 * @text Connect Wallet
 * @desc Connect to MetaMask and set player name and token balance.
 */

(() => {
    PluginManager.registerCommand("Bagz_WalletConnect", "ConnectWallet", async function () {
        if (typeof ethers === 'undefined') {
            console.warn("[Bagz] Ethers.js is not loaded.");
            return;
        }

        if (typeof window.ethereum === 'undefined') {
            console.warn("[Bagz] MetaMask is not installed.");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const connectedAddress = accounts[0];
            console.log('[Bagz] Connected to MetaMask:', connectedAddress);

            displayConnectedAddress(connectedAddress);
            setPlayerNameToWalletAddress(connectedAddress);

            const tokenBalance = await fetchTokenBalance(connectedAddress);
            replaceGoldAmount(tokenBalance);

        } catch (error) {
            console.error('[Bagz] Failed to connect to MetaMask:', error);
        }
    });

    function formatWalletAddress(address) {
        const firstPart = address.slice(0, 5);
        const lastPart = address.slice(-5);
        return `${firstPart}...${lastPart}`;
    }

    function displayConnectedAddress(address) {
        const formatted = formatWalletAddress(address);
        $gameMessage.add('Wallet Address: ' + formatted);
        console.log('[Bagz] Displaying address:', formatted);
    }

    function setPlayerNameToWalletAddress(address) {
        const formatted = formatWalletAddress(address);
        $gameParty.leader().setName(formatted);
        console.log('[Bagz] Set player name to:', formatted);

        if (SceneManager._scene && SceneManager._scene._statusWindow) {
            SceneManager._scene._statusWindow.refresh();
            console.log('[Bagz] Refreshed status window');
        } else {
            console.warn('[Bagz] Status window not available, skipping refresh');
        }
    }

    async function fetchTokenBalance(address) {
        console.log('[Bagz] Fetching token balance for:', address);
        const provider = new ethers.providers.JsonRpcProvider('https://base.llamarpc.com');
        const tokenContract = new ethers.Contract(
            '0x666a0210FC8574D7Cc5Ae53717F947348289618c',
            [
                'function balanceOf(address owner) view returns (uint256)',
                'function decimals() view returns (uint8)'
            ],
            provider
        );

        try {
            const rawBalance = await tokenContract.balanceOf(address);
            const decimals = await tokenContract.decimals();
            const formatted = parseFloat(ethers.utils.formatUnits(rawBalance, decimals)).toFixed(2);
            console.log('[Bagz] Token balance:', formatted);
            return formatted;
        } catch (error) {
            console.error('[Bagz] Error fetching token balance:', error);
            return '0';
        }
    }

    function replaceGoldAmount(tokenBalance) {
        const gold = Math.floor(parseFloat(tokenBalance) * 100);
        $gameParty._gold = gold;
        console.log('[Bagz] Replacing gold with token balance:', gold);

        if (SceneManager._scene && SceneManager._scene._goldWindow) {
            SceneManager._scene._goldWindow.refresh();
            console.log('[Bagz] Gold window refreshed');
        } else {
            console.warn('[Bagz] Gold window not found, skipping refresh');
        }
    }
})();
