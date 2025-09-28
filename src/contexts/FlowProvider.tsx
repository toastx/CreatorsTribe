import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as fcl from '@onflow/fcl';

// Configure FCL for Flow
fcl.config({
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'app.detail.title': 'Social Prime Bloom',
  'app.detail.icon': 'https://placekitten.com/g/200/200',
});

export interface FlowUser {
  addr: string | null;
  loggedIn: boolean | null;
}

interface FlowContextType {
  user: FlowUser;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isLoading: boolean;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};

interface FlowProviderProps {
  children: ReactNode;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FlowUser>({ addr: null, loggedIn: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      console.error('Failed to connect Flow wallet:', error);
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      setIsLoading(true);
      await fcl.unauthenticate();
    } catch (error) {
      console.error('Failed to disconnect Flow wallet:', error);
      setIsLoading(false);
    }
  };

  const value: FlowContextType = {
    user,
    connect,
    disconnect,
    isLoading,
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
};
