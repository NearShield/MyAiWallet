import { createPublicClient, http, formatEther, formatUnits } from 'viem'
import { mainnet, polygon, optimism, arbitrum, base } from 'viem/chains'
import { RPC_URLS } from '@/lib/config'

const clients = {
  ethereum: createPublicClient({ chain: mainnet, transport: http(RPC_URLS.ethereum) }),
  polygon: createPublicClient({ chain: polygon, transport: http(RPC_URLS.polygon) }),
  optimism: createPublicClient({ chain: optimism, transport: http(RPC_URLS.optimism) }),
  arbitrum: createPublicClient({ chain: arbitrum, transport: http(RPC_URLS.arbitrum) }),
  base: createPublicClient({ chain: base, transport: http(RPC_URLS.base) }),
}

export async function getEvmBalance(address: string, token?: string, chain = 'ethereum') {
  const client = clients[chain as keyof typeof clients] || clients.ethereum
  if (!token) {
    const balance = await client.getBalance({ address: address as `0x${string}` })
    return formatEther(balance)
  } else {
    // ERC20 balance (simplified)
    const abi = [{ constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: 'balance', type: 'uint256' }], type: 'function' }]
    const data = await client.readContract({
      address: token as `0x${string}`,
      abi,
      functionName: 'balanceOf',
      args: [address],
    })
    return formatUnits(data as bigint, 18) // assuming 18 decimals – you'd need to fetch decimals
  }
}

export async function getTokens(address: string) {
  // This would query an indexer like Moralis or Alchemy for token balances
  // For brevity, return placeholder
  return 'Token list not implemented (use Moralis or Alchemy SDK)'
}
