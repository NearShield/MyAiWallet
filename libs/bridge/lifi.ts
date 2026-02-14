import { Lifi, Route } from '@lifi/sdk'

const lifi = new Lifi()
const quoteStore: Map<string, Route> = new Map()

export async function getLifiQuote(params: any) {
  // Mock – return a dummy route for build
  return null
}

export function storeQuote(quote: Route): string {
  const id = Math.random().toString(36).substring(7)
  quoteStore.set(id, quote)
  return id
}

export function getStoredQuote(id: string): Route | undefined {
  return quoteStore.get(id)
}
