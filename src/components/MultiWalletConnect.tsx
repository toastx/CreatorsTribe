import React from 'react';
import RainbowKitConnect from './RainbowKitConnect';
import FlowConnect from './FlowConnect';
import { useAccount } from 'wagmi';
import { useFlow } from '@/contexts/FlowProvider';

const MultiWalletConnect: React.FC = () => {
  const { isConnected: isEthereumConnected } = useAccount();
  const { user: flowUser } = useFlow();

  return (
    <div className="flex items-center space-x-3">
      <RainbowKitConnect />
      <FlowConnect />
    </div>
  );
};

export default MultiWalletConnect;
