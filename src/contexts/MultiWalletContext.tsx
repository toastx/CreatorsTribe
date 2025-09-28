import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as fcl from '@onflow/fcl';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

// Configure FCL for Flow
fcl.config({
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'app.detail.title': 'Social Prime Bloom',
  'app.detail.icon': 'https://placekitten.com/g/200/200',
});

export type WalletType = 'flow' | 'ethereum';

export interface WalletUser {
  address: string | null;
  isConnected: boolean;
  walletType: WalletType | null;
  chainId?: string;
  balance?: string;
}

interface MultiWalletContextType {
  user: WalletUser;
  connectFlow: () => Promise<void>;
  connectMetaMask: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const MultiWalletContext = createContext<MultiWalletContextType | undefined>(undefined);

export const useMultiWallet = () => {
  const context = useContext(MultiWalletContext);
  if (context === undefined) {
    throw new Error('useMultiWallet must be used within a MultiWalletProvider');
  }
  return context;
};

interface MultiWalletProviderProps {
  children: ReactNode;
}

export const MultiWalletProvider: React.FC<MultiWalletProviderProps> = ({ children }) => {
  const [user, setUser] = useState<WalletUser>({
    address: null,
    isConnected: false,
    walletType: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ethereumProvider, setEthereumProvider] = useState<any>(null);

  useEffect(() => {
    // Initialize Ethereum provider
    const initEthereum = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setEthereumProvider(provider);
        
        // Check if already connected
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const chainId = await provider.request({ method: 'eth_chainId' });
          setUser({
            address: accounts[0],
            isConnected: true,
            walletType: 'ethereum',
            chainId,
          });
        }
      }
    };

    initEthereum();

    // Subscribe to Flow user changes
    const unsubscribeFlow = fcl.currentUser.subscribe((flowUser: any) => {
      if (flowUser.loggedIn && !user.isConnected) {
        setUser({
          address: flowUser.addr,
          isConnected: true,
          walletType: 'flow',
        });
      } else if (!flowUser.loggedIn && user.walletType === 'flow') {
        setUser({
          address: null,
          isConnected: false,
          walletType: null,
        });
      }
    });

    return () => {
      unsubscribeFlow();
    };
  }, [user.isConnected, user.walletType]);

  const connectFlow = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await fcl.authenticate();
    } catch (error: any) {
      setError(error.message || 'Failed to connect Flow wallet');
      console.error('Flow connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const connectMetaMask = async () => {
    if (!ethereumProvider) {
      setError('MetaMask not detected. Please install MetaMask.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Request account access
      const accounts = await ethereumProvider.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const chainId = await ethereumProvider.request({ method: 'eth_chainId' });
        setUser({
          address: accounts[0],
          isConnected: true,
          walletType: 'ethereum',
          chainId,
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to connect MetaMask');
      console.error('MetaMask connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (user.walletType === 'flow') {
        await fcl.unauthenticate();
      } else if (user.walletType === 'ethereum') {
        // Ethereum doesn't have a disconnect method, just clear state
        setUser({
          address: null,
          isConnected: false,
          walletType: null,
        });
      }
    } catch (error: any) {
      setError(error.message || 'Failed to disconnect wallet');
      console.error('Disconnect error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchChain = async (chainId: string) => {
    if (!ethereumProvider || user.walletType !== 'ethereum') {
      setError('Chain switching only available for Ethereum wallets');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await ethereumProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });

      setUser(prev => ({
        ...prev,
        chainId,
      }));
    } catch (error: any) {
      setError(error.message || 'Failed to switch chain');
      console.error('Chain switch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: MultiWalletContextType = {
    user,
    connectFlow,
    connectMetaMask,
    disconnect,
    switchChain,
    isLoading,
    error,
  };

  return (
    <MultiWalletContext.Provider value={value}>
      {children}
    </MultiWalletContext.Provider>
  );
};
