"use client"

import { useState, useRef, useEffect } from 'react'
import { Sparkles, HelpCircle, Code2, Loader2, Send, Bot, MessageSquare, Zap, Trash2, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { aiCodeGeneration } from '@/ai/flows/ai-code-generation-flow'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface AIPanelsProps {
  selectedText: string
  activeFileContent?: string
  onGeneratedCode: (code: string) => void
  onClose?: () => void
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIPanels({ selectedText, activeFileContent, onGeneratedCode, onClose }: AIPanelsProps) {
  const [chatPrompt, setChatPrompt] = useState('')
  const [genPrompt, setGenPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "SYSTEM READY. HOW CAN I ASSIST IN YOUR DEVELOPMENT?" }
  ])
  const [isBusy, setIsBusy] = useState(false)
  const { toast } = useToast()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, isBusy])

  const handleChat = async () => {
    if (!chatPrompt.trim() || isBusy) return
    const userMsg = chatPrompt.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setChatPrompt('')
    setIsBusy(true)

    try {
      const context = activeFileContent ? `\n\nCode Context:\n\`\`\`\n${activeFileContent}\n\`\`\`` : ""
      const result = await aiCodeGeneration({ description: `${userMsg}${context}` })
      setMessages(prev => [...prev, { role: 'assistant', content: result.code }])
    } catch (err: any) {
      toast({ variant: 'destructive', title: "AI Error" })
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="w-full flex flex-col h-full overflow-hidden bg-black border-l border-white/5">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-2">
          <Zap className="h-3 w-3 text-white opacity-40" />
          <span className="text-[9px] font-black tracking-[0.3em] text-white/60 uppercase">Caret Intelligence</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setMessages([{ role: 'assistant', content: "CLEARED." }])} className="p-1 hover:text-white text-muted-foreground/30 transition-colors">
            <Trash2 className="h-3 w-3" />
          </button>
          <button onClick={onClose} className="p-1 hover:text-white text-muted-foreground/30 transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full bg-transparent p-0 h-9 border-b border-white/5 gap-0 rounded-none">
          <TabsTrigger value="chat" className="flex-1 text-[9px] uppercase font-black tracking-widest border-r border-white/5 data-[state=active]:bg-white/[0.03]">Chat</TabsTrigger>
          <TabsTrigger value="gen" className="flex-1 text-[9px] uppercase font-black tracking-widest data-[state=active]:bg-white/[0.03]">Build</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0 bg-black">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-6 pb-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex flex-col gap-2 max-w-[95%]", m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
                  <div className={cn("text-[8px] font-black tracking-widest uppercase opacity-30", m.role === 'user' ? "text-right" : "text-left")}>
                    {m.role === 'user' ? 'USER' : 'ASSISTANT'}
                  </div>
                  <div className={cn("rounded-lg p-3 text-[11px] leading-relaxed border", m.role === 'user' ? "bg-white/[0.03] border-white/10" : "bg-black border-white/5")}>
                    <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                  </div>
                </div>
              ))}
              {isBusy && <Loader2 className="h-4 w-4 animate-spin opacity-20 mx-auto" />}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-white/5 bg-white/[0.01]">
            <div className="relative">
              <Textarea 
                placeholder="INPUT COMMAND..."
                className="min-h-[60px] max-h-[120px] bg-black border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-lg focus-visible:ring-1 focus-visible:ring-white/20"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleChat())}
              />
              <Button size="icon" variant="ghost" className="absolute right-2 bottom-2 h-7 w-7 text-white/40 hover:text-white" onClick={handleChat} disabled={isBusy || !chatPrompt.trim()}>
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gen" className="flex-1 p-5 m-0 space-y-4 bg-black">
          <Textarea 
            placeholder="DESCRIBE COMPONENT..."
            className="min-h-[120px] bg-black border-white/10 text-[10px] font-bold tracking-widest rounded-lg"
            value={genPrompt}
            onChange={(e) => setGenPrompt(e.target.value)}
          />
          <Button className="w-full bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.3em] text-[10px]" onClick={handleChat} disabled={isBusy}>
            GENERATE
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
