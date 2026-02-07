import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export interface WalletState {
    address: string | null;
    balance: string | null;
    chainId: number | null;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
}

export function useWallet() {
    const [wallet, setWallet] = useState<WalletState>({
        address: null,
        balance: null,
        chainId: null,
        isConnected: false,
        isConnecting: false,
        error: null,
    });

    const updateWalletState = useCallback(async (provider: ethers.BrowserProvider, account: string) => {
        try {
            const balance = await provider.getBalance(account);
            const network = await provider.getNetwork();

            setWallet(prev => ({
                ...prev,
                address: account,
                balance: ethers.formatEther(balance),
                chainId: Number(network.chainId),
                isConnected: true,
                isConnecting: false,
                error: null,
            }));
        } catch (err) {
            console.error("Failed to update wallet state", err);
            setWallet(prev => ({ ...prev, isConnecting: false, error: "Failed to update wallet details" }));
        }
    }, []);

    const connect = async () => {
        if (!window.ethereum) {
            setWallet(prev => ({ ...prev, error: "MetaMask not installed" }));
            return;
        }

        setWallet(prev => ({ ...prev, isConnecting: true, error: null }));

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);

            if (accounts.length > 0) {
                await updateWalletState(provider, accounts[0]);
            } else {
                setWallet(prev => ({ ...prev, isConnecting: false, error: "No accounts found" }));
            }
        } catch (err: any) {
            setWallet(prev => ({ ...prev, isConnecting: false, error: err.message || "Failed to connect" }));
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);

            // Check if already connected
            provider.listAccounts().then(async (accounts) => {
                if (accounts.length > 0) {
                    await updateWalletState(provider, accounts[0].address);
                }
            });

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    updateWalletState(provider, accounts[0]);
                } else {
                    setWallet({
                        address: null,
                        balance: null,
                        chainId: null,
                        isConnected: false,
                        isConnecting: false,
                        error: null,
                    });
                }
            });
        }
    }, [updateWalletState]);

    return { ...wallet, connect };
}

// Add types for window.ethereum
declare global {
    interface Window {
        ethereum?: any;
    }
}