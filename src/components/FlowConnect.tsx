import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFlow } from '@/contexts/FlowProvider';
import { Zap, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const FlowConnect: React.FC = () => {
  const { user, connect, disconnect, isLoading } = useFlow();

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <Button disabled variant="outline" size="sm">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Connecting...
      </Button>
    );
  }

  if (!user.loggedIn) {
    return (
      <Button onClick={connect} variant="outline" size="sm">
        <Zap className="h-4 w-4 mr-2" />
        Connect Flow
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          {formatAddress(user.addr || '')}
          <Badge variant="secondary" className="ml-2">
            Flow
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Flow Address</span>
            <span className="text-xs text-muted-foreground font-mono">
              {user.addr}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect} className="text-red-600">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlowConnect;
