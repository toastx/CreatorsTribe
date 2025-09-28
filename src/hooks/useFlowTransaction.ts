import { useState } from 'react';
import * as fcl from '@onflow/fcl';
import { useWallet } from '@/contexts/WalletContext';

interface TransactionResult {
  transactionId: string | null;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export const useFlowTransaction = () => {
  const [result, setResult] = useState<TransactionResult>({
    transactionId: null,
    error: null,
    status: 'idle',
  });
  const { isConnected } = useWallet();

  const sendTransaction = async (
    cadence: string,
    args: any[] = [],
    proposer?: any,
    authorizations?: any[],
    payer?: any
  ) => {
    if (!isConnected) {
      setResult({
        transactionId: null,
        error: 'Wallet not connected',
        status: 'error',
      });
      return;
    }

    setResult({ transactionId: null, error: null, status: 'loading' });

    try {
      const transactionId = await fcl.mutate({
        cadence,
        args,
        proposer,
        authorizations,
        payer,
      });

      setResult({
        transactionId,
        error: null,
        status: 'success',
      });

      return transactionId;
    } catch (error: any) {
      setResult({
        transactionId: null,
        error: error.message || 'Transaction failed',
        status: 'error',
      });
      throw error;
    }
  };

  const executeScript = async (cadence: string, args: any[] = []) => {
    setResult({ transactionId: null, error: null, status: 'loading' });

    try {
      const result = await fcl.query({
        cadence,
        args,
      });

      setResult({
        transactionId: null,
        error: null,
        status: 'success',
      });

      return result;
    } catch (error: any) {
      setResult({
        transactionId: null,
        error: error.message || 'Script execution failed',
        status: 'error',
      });
      throw error;
    }
  };

  const reset = () => {
    setResult({
      transactionId: null,
      error: null,
      status: 'idle',
    });
  };

  return {
    ...result,
    sendTransaction,
    executeScript,
    reset,
  };
};
