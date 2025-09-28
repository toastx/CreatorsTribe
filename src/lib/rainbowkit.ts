import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Social Prime Bloom',
  projectId: 'YOUR_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [mainnet, polygon, optimism, arbitrum, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
