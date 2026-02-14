'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SolanaWalletProvider } from '@/components/SolanaWalletProvider'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'AI Wallet',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <SolanaWalletProvider>
            <TonConnectUIProvider manifestUrl="https://your-app.com/tonconnect-manifest.json">
              {children}
            </TonConnectUIProvider>
          </SolanaWalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
