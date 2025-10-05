"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

export default function ChatPage() {
  const [chatId, setChatId] = useState<string>("")
  const [initialized, setInitialized] = useState<boolean>(false)
  const [initPending, setInitPending] = useState<boolean>(false)

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), [])

  const { messages, sendMessage, status } = useChat({
    transport,
  })

  async function initChat() {
    if (!chatId.trim()) return
    setInitPending(true)
    try {
      const res = await fetch("/api/chat-init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: chatId.trim() }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setInitialized(true)
      } else {
        alert(data?.error || "Failed to initialize chat")
      }
    } finally {
      setInitPending(false)
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-4 flex gap-2">
        <h1>Not implemented yet</h1>
          <Input
            placeholder="Enter ID to initialize chat"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            aria-label="Chat ID"
            disabled
          />
          <Button aria-disabled onClick={initChat} disabled={initPending || !chatId.trim()}>
            {initPending ? "Initializing..." : "Initialize"}
          </Button>
        </div>

        {!initialized ? (
          <div className="text-sm text-muted-foreground">{"Initialize the chat with an ID to begin."}</div>
        ) : (
          <div className="rounded-md border bg-card">
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="text-sm">
                  <span className="font-medium">
                    {m.role === "user" ? "You" : "AI"}
                    {": "}
                  </span>
                  {m.parts
                    .filter((p) => p.type === "text")
                    .map((p: any, i: number) => (
                      <span key={i}>{p.text}</span>
                    ))}
                </div>
              ))}
            </div>
            <form
              className="flex items-center gap-2 border-t p-3"
              onSubmit={(e) => {
                e.preventDefault()
                const input = (e.currentTarget as any).message.value as string
                if (!input.trim()) return
                sendMessage({ text: input })
                ;(e.currentTarget as any).message.value = ""
              }}
            >
              <Input
                name="message"
                placeholder="Type your message..."
                disabled={status === "in_progress"}
                aria-label="Message"
              />
              <Button type="submit" disabled={status === "in_progress"}>
                {"Send"}
              </Button>
            </form>
          </div>
        )}
      </main>
    </>
  )
}
