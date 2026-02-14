import { getEvmBalance, getSolanaBalance } from './blockchain/evm'
import { getLifiQuote, executeLifiRoute, storeQuote, getStoredQuote } from './bridge/lifi'
import { checkTokenSafety, checkUrlSafety } from './security'
import { getTokens as getEvmTokens } from './blockchain/evm'
import { getTokens as getSolanaTokens } from './blockchain/solana'

// Helper to detect chain type
function detectChain(chain: string): 'evm' | 'solana' | 'ton' {
  const lower = chain.toLowerCase()
  if (['ethereum', 'polygon', 'optimism', 'arbitrum', 'base', 'bsc', 'avalanche'].includes(lower)) return 'evm'
  if (lower === 'solana') return 'solana'
  if (lower === 'ton') return 'ton'
  return 'evm' // default
}

export async function getBalance(address: string, chain: string, token?: string) {
  const type = detectChain(chain)
  if (type === 'evm') {
    const bal = await getEvmBalance(address, token, chain)
    return `Your balance: ${bal} ${token || 'native'}`
  }
  if (type === 'solana') {
    const bal = await getSolanaBalance(address, token)
    return `Your balance: ${bal} SOL`
  }
  return `Chain ${chain} not supported.`
}

export async function getTokens(address: string, chain?: string) {
  // Simplified: just EVM for now
  return getEvmTokens(address)
}

export async function swap(params: any, address: string) {
  const quote = await getLifiQuote({ ...params, fromAddress: address, sameChain: true })
  if (!quote) return 'No swap route found.'
  const quoteId = storeQuote(quote)
  return {
    content: `Best swap: receive ${quote.estimate.toAmount} ${quote.estimate.toToken}. Fee: ${quote.estimate.fee}. Confirm? (quote id ${quoteId})`,
    quoteId,
  }
}

export async function bridge(params: any, address: string) {
  const quote = await getLifiQuote({ ...params, fromAddress: address })
  if (!quote) return 'No bridge route found.'
  const quoteId = storeQuote(quote)
  return {
    content: `Best route: fee ${quote.estimate.fee}, receive ${quote.estimate.toAmount} ${quote.estimate.toToken} on ${params.toChain}. Estimated time: ${quote.estimate.executionDuration}. Confirm? (quote id ${quoteId})`,
    quoteId,
  }
}

export async function revokeApproval(params: any, address: string) {
  return 'Revoke functionality not yet implemented.'
}

export async function checkSafety(type: 'token' | 'url', value: string) {
  if (type === 'token') {
    const result = await checkTokenSafety(value)
    return result.safe ? 'Token appears safe.' : `⚠️ WARNING: Unsafe token. Reason: ${result.reason}`
  } else {
    const result = await checkUrlSafety(value)
    return result.safe ? 'Website appears safe.' : `⚠️ WARNING: Phishing site. Reason: ${result.reason}`
  }
}
