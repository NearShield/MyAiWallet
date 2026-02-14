'use client'
import { useChat } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef } from 'react'
import { useWallet } from '@/hooks/useWallet'

export function WalletChat() {
  const { wallet } = useWallet() // unified wallet state
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { wallet }, // send wallet info to API
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AI Wallet</h1>
        <ConnectWalletButton />
      </div>
      <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
        {messages.map(m => (
          <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Send a message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>Send</Button>
      </form>
    </div>
  )
}
