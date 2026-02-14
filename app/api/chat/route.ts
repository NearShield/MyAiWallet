import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { z } from 'zod'
import { getBalance, getTokens, swap, bridge, revokeApproval, checkSafety } from '@/lib/ai-tools'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, wallet } = await req.json()

  const tools = {
    getBalance: tool({
      description: 'Get the balance of the connected wallet for a specific chain and token',
      parameters: z.object({
        chain: z.string(),
        token: z.string().optional(),
      }),
      execute: async ({ chain, token }) => {
        if (!wallet?.address) return 'Wallet not connected.'
        return getBalance(wallet.address, chain, token)
      },
    }),
    getTokens: tool({
      description: 'List all tokens and NFTs in the wallet with balances and floor prices',
      parameters: z.object({ chain: z.string().optional() }),
      execute: async ({ chain }) => {
        if (!wallet?.address) return 'Wallet not connected.'
        return getTokens(wallet.address, chain)
      },
    }),
    swap: tool({
      description: 'Swap tokens on the same chain',
      parameters: z.object({
        fromChain: z.string(),
        fromToken: z.string(),
        toToken: z.string(),
        amount: z.string(),
      }),
      execute: async (params) => {
        if (!wallet?.address) return 'Wallet not connected.'
        return swap(params, wallet.address)
      },
    }),
    bridge: tool({
      description: 'Bridge tokens from one chain to another with best low-fee route',
      parameters: z.object({
        fromChain: z.string(),
        toChain: z.string(),
        token: z.string(),
        amount: z.string(),
      }),
      execute: async (params) => {
        if (!wallet?.address) return 'Wallet not connected.'
        return bridge(params, wallet.address)
      },
    }),
    revokeApproval: tool({
      description: 'Revoke a token approval',
      parameters: z.object({
        chain: z.string(),
        token: z.string(),
        spender: z.string(),
      }),
      execute: async (params) => {
        if (!wallet?.address) return 'Wallet not connected.'
        return revokeApproval(params, wallet.address)
      },
    }),
    checkSafety: tool({
      description: 'Check if a token contract or website is safe',
      parameters: z.object({
        type: z.enum(['token', 'url']),
        value: z.string(),
      }),
      execute: async ({ type, value }) => {
        return checkSafety(type, value)
      },
    }),
  }

  const result = streamText({
    model: openai('gpt-4o'),
    system: `You are a helpful AI crypto wallet assistant. You have access to tools that let you interact with the user's wallet. Always ask for confirmation before executing high‑risk actions like sending, swapping, bridging, or revoking approvals. Use the safety check tool whenever the user mentions a token address or a website. For bridging, use the bridge tool that finds the best low‑fee route. Be concise and friendly.`,
    messages,
    tools,
  })

  return result.toDataStreamResponse()
}
