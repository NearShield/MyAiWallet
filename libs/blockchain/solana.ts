import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { RPC_URLS } from '@/lib/config'

const connection = new Connection(RPC_URLS.solana)

export async function getSolanaBalance(address: string, token?: string) {
  const pubkey = new PublicKey(address)
  if (!token) {
    const balance = await connection.getBalance(pubkey)
    return (balance / LAMPORTS_PER_SOL).toString()
  } else {
    // SPL token balance – requires token account lookup
    return 'SPL token balance not implemented'
  }
}
