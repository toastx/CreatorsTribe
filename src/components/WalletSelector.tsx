import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMultiWallet } from '@/contexts/MultiWalletContext';
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

const WalletSelector: React.FC = () => {
  const { user, connectFlow, connectMetaMask, disconnect, isLoading, error } = useMultiWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getWalletIcon = (walletType: string) => {
    switch (walletType) {
      case 'flow':
        return <Zap className="h-4 w-4" />;
      case 'ethereum':
        return <Wallet className="h-4 w-4" />;
      default:
        return <Wallet className="h-4 w-4" />;
    }
  };

  const getWalletName = (walletType: string) => {
    switch (walletType) {
      case 'flow':
        return 'Flow Wallet';
      case 'ethereum':
        return 'MetaMask';
      default:
        return 'Wallet';
    }
  };

  const getChainName = (chainId: string) => {
    switch (chainId) {
      case '0x1':
        return 'Ethereum Mainnet';
      case '0x89':
        return 'Polygon';
      case '0xa':
        return 'Optimism';
      case '0xa4b1':
        return 'Arbitrum';
      default:
        return `Chain ${chainId}`;
    }
  };

  if (isLoading) {
    return (
      <Button disabled variant="outline" size="sm">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Connecting...
      </Button>
    );
  }

  if (!user.isConnected) {
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
                Select a wallet to connect to Social Prime Bloom
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
                </div>
              )}

              <div className="grid gap-3">
                <Card 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={connectFlow}
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

                <Card 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={connectMetaMask}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">MetaMask</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect with MetaMask for Ethereum and EVM chains
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
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
        <Button variant="outline" size="sm">
          {getWalletIcon(user.walletType || '')}
          <span className="ml-2">{formatAddress(user.address || '')}</span>
          <Badge variant="secondary" className="ml-2">
            {getWalletName(user.walletType || '')}
          </Badge>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Connected</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {user.address}
          </div>
          {user.chainId && (
            <Badge variant="outline" className="mt-2">
              {getChainName(user.chainId)}
            </Badge>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletSelector;
