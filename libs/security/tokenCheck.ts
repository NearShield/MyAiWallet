// Example using GoPlusLabs
export async function checkTokenSafety(tokenAddress: string, chain = 'ethereum') {
  const chainId = chain === 'ethereum' ? 1 : 137 // map as needed
  const url = `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${tokenAddress}`
  try {
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${process.env.GOPLUS_API_KEY}` }
    })
    const data = await res.json()
    const result = data.result[tokenAddress.toLowerCase()]
    if (result?.malicious) {
      return { safe: false, reason: result.malicious_reason || 'Malicious token' }
    }
    return { safe: true }
  } catch {
    return { safe: false, reason: 'Unable to check safety' }
  }
}
