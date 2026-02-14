import { createPublicClient, http, formatEther } from 'viem'
import { mainnet } from 'viem/chains'

export async function getEvmBalance(address: string, token?: string, chain = 'ethereum') {
  // Mock implementation – replace with actual RPC calls
  return '0.0'
}

export async function getTokens(address: string) {
  return 'Token list not implemented (use Moralis or Alchemy SDK)'
}
