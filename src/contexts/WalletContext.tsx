import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as fcl from '@onflow/fcl';

// Configure FCL for different networks
fcl.config({
  'accessNode.api': 'https://rest-testnet.onflow.org', // Testnet
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'app.detail.title': 'Social Prime Bloom',
  'app.detail.icon': 'https://placekitten.com/g/200/200',
});

export interface User {
  addr: string | null;
  loggedIn: boolean | null;
}

interface WalletContextType {
  user: User;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ addr: null, loggedIn: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to user changes
    const unsubscribe = fcl.currentUser.subscribe((user: any) => {
      setUser({ addr: user.addr, loggedIn: user.loggedIn });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const connect = async () => {
    try {
      setIsLoading(true);
      await fcl.authenticate();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      setIsLoading(true);
      await fcl.unauthenticate();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      setIsLoading(false);
    }
  };

  const value: WalletContextType = {
    user,
    connect,
    disconnect,
    isConnected: user.loggedIn === true,
    isLoading,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
