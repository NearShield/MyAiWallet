'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { Button } from '@/components/ui/button'

export function ConnectWalletButton() {
  // For simplicity, we show RainbowKit button.
  // You can enhance to show Solana/TON connect buttons when on those chains.
  return <ConnectButton />
}
