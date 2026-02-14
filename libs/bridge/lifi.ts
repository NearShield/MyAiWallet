import { Lifi, Route } from '@lifi/sdk'
import { CHAIN_IDS } from '@/lib/config'

const lifi = new Lifi()

// Simple in‑memory quote storage (use Redis in production)
const quoteStore: Map<string, Route> = new Map()

export async function getLifiQuote({ fromChain, toChain, token, amount, fromAddress, sameChain = false }: any) {
  const fromChainId = CHAIN_IDS[fromChain.toLowerCase() as keyof typeof CHAIN_IDS] || 1
  const toChainId = sameChain ? fromChainId : (CHAIN_IDS[toChain.toLowerCase() as keyof typeof CHAIN_IDS] || 1)

  const routes = await lifi.getRoutes({
    fromChainId,
    toChainId,
    fromTokenAddress: token, // can be symbol or address; LI.FI will resolve
    toTokenAddress: token,
    fromAmount: amount,
    fromAddress,
    options: {
      slippage: 0.03, // 3% slippage
      order: 'RECOMMENDED',
    },
  })

  if (!routes.routes.length) return null
  // Return the cheapest route by cost (fees)
  return routes.routes.sort((a, b) => a.cost.total - b.cost.total)[0]
}

export function storeQuote(quote: Route): string {
  const id = Math.random().toString(36).substring(7)
  quoteStore.set(id, quote)
  return id
}

export function getStoredQuote(id: string): Route | undefined {
  return quoteStore.get(id)
}

export async function executeLifiRoute(quote: Route, privateKey?: string) {
  // In a real app, you'd use wallet SDK to sign and send.
  // For now we just return the transaction request.
  return quote
}
