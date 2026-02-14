'use client'
import { useAccount } from 'wagmi'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useTonAddress } from '@tonconnect/ui-react'
import { useMemo } from 'react'

export function useWallet() {
  const { address: evmAddress, chainId } = useAccount()
  const { publicKey: solanaPublicKey } = useSolanaWallet()
  const tonAddress = useTonAddress()

  const wallet = useMemo(() => {
    // Simple unified wallet object – you can extend with chain detection
    return {
      address: evmAddress || solanaPublicKey?.toString() || tonAddress || null,
      chain: evmAddress ? 'evm' : solanaPublicKey ? 'solana' : tonAddress ? 'ton' : null,
    }
  }, [evmAddress, solanaPublicKey, tonAddress])

  return { wallet }
}
