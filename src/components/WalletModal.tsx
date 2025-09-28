import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, Loader2, CheckCircle } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { user, connect, disconnect, isConnected, isLoading } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      onClose();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      onClose();
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connection
          </DialogTitle>
          <DialogDescription>
            {isConnected
              ? 'Your wallet is connected to Social Prime Bloom'
              : 'Connect your Flow wallet to access all features'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Wallet Connected
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-mono">
                    {user.addr}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-4">
                <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Connect your Flow wallet to get started
                </p>
              </div>
              <Button
                onClick={handleConnect}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Wallet className="h-4 w-4 mr-2" />
                )}
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
