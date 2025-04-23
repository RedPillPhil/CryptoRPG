/*:
 * @target MZ
 * @plugindesc Connects to MetaMask wallet and fetches token balance from Basechain [Bagz]
 * @command ConnectWallet
 * @text Connect Wallet
 * @desc Connects to MetaMask and updates player name and gold based on token balance
 */

(() => {
    const pluginName = 'Bagz_WalletConnect';

    function formatWalletAddress(address) {
        const first = address.slice(0, 5);
        const last = address.slice(-5);
        return `${first}...${last}`;
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
        }
    }

    async function fetchTokenBalance(address) {
        console.log('[Bagz] Fetching token balance for:', address);
        if (typeof ethers === 'undefined') {
            console.error('[Bagz] ethers is not loaded');
            return '0';
        }

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
            const raw = await tokenContract.balanceOf(address);
            const decimals = await tokenContract.decimals();
            return parseFloat(ethers.utils.formatUnits(raw, decimals)).toFixed(2);
        } catch (error) {
            console.error('[Bagz] Error fetching token balance:', error);
            return '0';
        }
    }

    function replaceGoldAmount(balance) {
        const gold = parseInt(parseFloat(balance) * 100);
        $gameParty._gold = gold;
        if (SceneManager._scene && SceneManager._scene._goldWindow) {
            SceneManager._scene._goldWindow.refresh();
        }
    }

    async function connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            console.warn('[Bagz] MetaMask not detected');
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];

            displayConnectedAddress(address);
            setPlayerNameToWalletAddress(address);

            const balance = await fetchTokenBalance(address);
            replaceGoldAmount(balance);
        } catch (e) {
            console.error('[Bagz] Failed to connect wallet:', e);
        }
    }

    PluginManager.registerCommand(pluginName, 'ConnectWallet', () => {
        connectWallet();
    });

    // Auto-load ethers.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js';
    script.onload = () => console.log('[Bagz] Ethers.js loaded ✅');
    document.head.appendChild(script);
})();
