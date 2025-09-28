import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAccount, useChainId } from 'wagmi';
import { Wallet, Zap } from 'lucide-react';

const RainbowKitConnect: React.FC = () => {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum';
      case 137:
        return 'Polygon';
      case 10:
        return 'Optimism';
      case 42161:
        return 'Arbitrum';
      case 11155111:
        return 'Sepolia';
      default:
        return `Chain ${chainId}`;
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center space-x-3">
      {isConnected && (
        <Badge variant="outline" className="hidden sm:flex">
          <Zap className="w-3 h-3 mr-1" />
          {getChainName(chainId)}
        </Badge>
      )}
      
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} variant="default" size="sm">
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal} variant="destructive" size="sm">
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={openChainModal}
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>

                    <Button onClick={openAccountModal} variant="outline" size="sm">
                      <Wallet className="h-4 w-4 mr-2" />
                      {formatAddress(account.address)}
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default RainbowKitConnect;
