import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAccount, useChainId } from 'wagmi';
import { useFlow } from '@/contexts/FlowProvider';
import { 
  Wallet, 
  LogOut, 
  Loader2, 
  ChevronDown,
  Zap,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const UnifiedWalletConnect: React.FC = () => {
  const { isConnected: isEthereumConnected, address: ethereumAddress } = useAccount();
  const { user: flowUser, connect: connectFlow, disconnect: disconnectFlow, isLoading: isFlowLoading } = useFlow();
  const chainId = useChainId();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

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

  const handleFlowConnect = async () => {
    try {
      setIsConnecting(true);
      await connectFlow();
      setShowWalletModal(false);
    } catch (error) {
      console.error('Flow connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (flowUser.loggedIn) {
        await disconnectFlow();
      }
      // Ethereum disconnection is handled by RainbowKit
      if (isEthereumConnected) {
        // Force a page reload to reset the RainbowKit state
        window.location.reload();
      }
    } catch (error) {
      console.error('Error disconnecting wallets:', error);
    }
  };

  const isAnyWalletConnected = isEthereumConnected || flowUser.loggedIn;

  if (isConnecting) {
    return (
      <Button disabled variant="outline" size="sm">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Connecting...
      </Button>
    );
  }

  if (!isAnyWalletConnected || isFlowLoading) {
    return (
      <>
        <Button onClick={() => setShowWalletModal(true)} variant="default" size="sm">
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>

        <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Choose Your Wallet
              </DialogTitle>
              <DialogDescription>
                Select a wallet to connect to Creators Tribe
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-3">
                {/* Flow Wallet Option */}
                <Card 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={handleFlowConnect}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Flow Wallet</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect with Blocto, Ledger, or other Flow wallets
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                {/* Ethereum Wallets via RainbowKit */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Ethereum & EVM Chains</div>
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <Card 
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          openConnectModal();
                          setShowWalletModal(false);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                              <Wallet className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">Ethereum Wallets</h3>
                              <p className="text-sm text-muted-foreground">
                                MetaMask, Coinbase, WalletConnect, and 50+ others
                              </p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </ConnectButton.Custom>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Wallet className="h-4 w-4" />
          {ethereumAddress ? (
            <>
              {formatAddress(ethereumAddress)}
              <Badge variant="secondary" className="ml-1">
                {getChainName(chainId)}
              </Badge>
            </>
          ) : flowUser.addr ? (
            <>
              {formatAddress(flowUser.addr)}
              <Badge variant="secondary" className="ml-1">
                Flow
              </Badge>
            </>
          ) : null}
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-3">
          <h4 className="text-sm font-medium mb-2">Connected Wallets</h4>
          
          {isEthereumConnected && (
            <div className="mb-3 p-2 bg-muted/30 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">Ethereum</span>
                <CheckCircle className="h-3 w-3 text-green-500" />
              </div>
              <div className="text-xs text-muted-foreground font-mono break-all">
                {ethereumAddress}
              </div>
              <Badge variant="outline" className="mt-1 text-[10px] h-5">
                {getChainName(chainId)}
              </Badge>
            </div>
          )}
          
          {flowUser.loggedIn && flowUser.addr && (
            <div className="p-2 bg-muted/30 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">Flow</span>
                <CheckCircle className="h-3 w-3 text-green-500" />
              </div>
              <div className="text-xs text-muted-foreground font-mono break-all">
                {flowUser.addr}
              </div>
              <Badge variant="outline" className="mt-1 text-[10px] h-5">
                Flow Testnet
              </Badge>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UnifiedWalletConnect;
