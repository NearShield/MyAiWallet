# MyAiWallet
# AI Crypto Wallet

A Next.js 14 AI‑powered wallet that lets you control your multi‑chain assets through natural language chat. Built with Vercel AI SDK, wagmi/viem, Solana Web3.js, TON Connect, and LI.FI for cross‑chain bridging.

## Features

- **Chat‑based control** – Send, swap, bridge, revoke approvals, check balances/NFTs, and more by just chatting.
- **Multi‑chain** – EVM (Ethereum, Polygon, Optimism, Arbitrum, Base), Solana, TON (basic).
- **Cross‑chain bridging** – Uses LI.FI to find the lowest‑fee route across 20+ chains.
- **Security first** – Simulates all transactions, warns about unsafe tokens/URLs via GoPlusLabs & Blockaid.
- **Resources page** – Quick access to DexScreener, DefiLlama, Revoke.cash, etc.

## Deployment

1. Clone the repo and install dependencies.
2. Copy `.env.example` to `.env.local` and fill in your API keys.
3. Run `npm run dev` for development.
4. Deploy to Vercel with one click.

## Environment Variables

See `.env.example` for all required keys.

## License

MIT
