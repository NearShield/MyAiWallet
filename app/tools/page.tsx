export default function ToolsPage() {
  const categories = [
    {
      name: 'Trading & Charts',
      links: [
        { name: 'DexScreener', url: 'https://dexscreener.com' },
        { name: 'Birdeye', url: 'https://birdeye.so' },
        { name: 'TradingView', url: 'https://tradingview.com' },
      ],
    },
    {
      name: 'DeFi & Analytics',
      links: [
        { name: 'DefiLlama', url: 'https://defillama.com' },
        { name: 'Dune Analytics', url: 'https://dune.com' },
        { name: 'CoinGecko', url: 'https://coingecko.com' },
      ],
    },
    {
      name: 'Security & Approvals',
      links: [
        { name: 'Revoke.cash', url: 'https://revoke.cash' },
        { name: 'Etherscan', url: 'https://etherscan.io' },
        { name: 'Solscan', url: 'https://solscan.io' },
      ],
    },
    {
      name: 'Bridges & Swaps',
      links: [
        { name: 'LI.FI', url: 'https://li.fi' },
        { name: 'Jupiter', url: 'https://jup.ag' },
        { name: '1inch', url: 'https://1inch.io' },
      ],
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Resources & Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.name} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{cat.name}</h2>
            <ul className="space-y-2">
              {cat.links.map(link => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
