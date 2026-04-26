
"use client"

import { useState, useRef, useEffect } from 'react'
import { Sparkles, HelpCircle, Code2, Loader2, Send, Bot, MessageSquare, Zap, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { aiCodeGeneration } from '@/ai/flows/ai-code-generation-flow'
import { aiCodeExplanation } from '@/ai/flows/ai-code-explanation'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIPanelsProps {
  selectedText: string
  activeFileContent?: string
  onGeneratedCode: (code: string) => void
}

export function AIPanels({ selectedText, activeFileContent, onGeneratedCode }: AIPanelsProps) {
  const [chatPrompt, setChatPrompt] = useState('')
  const [genPrompt, setGenPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Caret AI. I'm connected to Gemini. How can I help you build today?" }
  ])
  const [isBusy, setIsBusy] = useState(false)
  const [explanation, setExplanation] = useState('')
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
      const context = activeFileContent ? `\n\nActive File Code:\n\`\`\`\n${activeFileContent}\n\`\`\`` : ""
      const result = await aiCodeGeneration({ 
        description: `User Question: ${userMsg}${context}\n\nPlease provide a clear, technical response.` 
      })
      setMessages(prev => [...prev, { role: 'assistant', content: result.code }])
    } catch (err: any) {
      toast({ variant: 'destructive', title: "AI Connection Error", description: "Please check your configuration or try again." })
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error. Please ensure your environment is configured correctly." }])
    } finally {
      setIsBusy(false)
    }
  }

  const handleGenerate = async () => {
    if (!genPrompt.trim() || isBusy) return
    setIsBusy(true)
    try {
      const result = await aiCodeGeneration({ description: genPrompt })
      onGeneratedCode(result.code)
      setGenPrompt('')
      toast({ title: "Success!", description: "AI code has been generated and updated." })
    } catch (err) {
      toast({ variant: 'destructive', title: "Generation failed", description: "Try a more specific prompt." })
    } finally {
      setIsBusy(false)
    }
  }

  const handleExplain = async () => {
    if (!selectedText || isBusy) {
      toast({ title: "No selection", description: "Highlight some code first!" })
      return
    }
    setIsBusy(true)
    try {
      const result = await aiCodeExplanation({ code: selectedText })
      setExplanation(result.explanation)
    } catch (err) {
      toast({ variant: 'destructive', title: "Analysis failed" })
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="w-80 flex flex-col h-full overflow-hidden bg-[#0A0A0A] border-l border-white/5 shadow-2xl">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.4)]">
            <Zap className="h-3 w-3 text-white" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-primary uppercase">Caret AI Assistant</span>
        </div>
        <button onClick={() => setMessages([{ role: 'assistant', content: "Chat cleared." }])} className="p-1 hover:text-white text-muted-foreground/40 transition-colors">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full bg-transparent p-1 h-10 border-b border-white/5 gap-1 rounded-none">
          <TabsTrigger value="chat" className="flex-1 text-[10px] gap-1.5 uppercase font-bold tracking-tighter"><MessageSquare className="h-3 w-3" />Chat</TabsTrigger>
          <TabsTrigger value="gen" className="flex-1 text-[10px] gap-1.5 uppercase font-bold tracking-tighter"><Code2 className="h-3 w-3" />Build</TabsTrigger>
          <TabsTrigger value="help" className="flex-1 text-[10px] gap-1.5 uppercase font-bold tracking-tighter"><HelpCircle className="h-3 w-3" />Logic</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4 pb-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-2 max-w-[95%] animate-in fade-in slide-in-from-bottom-2", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-lg", m.role === 'user' ? "bg-accent" : "bg-primary")}>
                    {m.role === 'user' ? <div className="text-[10px] font-bold">U</div> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={cn("rounded-2xl p-3 text-[11px] leading-relaxed", m.role === 'user' ? "bg-accent/10 border border-accent/20" : "bg-muted/30 border border-white/5")}>
                    <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                  </div>
                </div>
              ))}
              {isBusy && (
                <div className="flex gap-2 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-3 text-[10px] border border-white/5">Thinking...</div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-white/5 bg-black/40">
            <div className="relative">
              <Textarea 
                placeholder="Ask Caret AI..."
                className="min-h-[70px] max-h-[150px] bg-background border-white/10 text-[11px] pr-10 rounded-xl"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleChat())}
              />
              <Button size="icon" variant="ghost" className="absolute right-2 bottom-2 h-8 w-8 text-primary" onClick={handleChat} disabled={isBusy || !chatPrompt.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gen" className="flex-1 p-5 space-y-4 m-0">
          <Textarea 
            placeholder="Describe the code you want to generate..."
            className="min-h-[150px] bg-background border-white/10 text-[11px] rounded-xl"
            value={genPrompt}
            onChange={(e) => setGenPrompt(e.target.value)}
          />
          <Button className="w-full bg-primary font-bold uppercase tracking-widest text-[11px]" onClick={handleGenerate} disabled={isBusy || !genPrompt.trim()}>
            {isBusy ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate Code
          </Button>
        </TabsContent>

        <TabsContent value="help" className="flex-1 p-5 space-y-4 m-0">
          <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10 font-bold uppercase text-[11px]" onClick={handleExplain} disabled={isBusy}>
            Analyze Selection
          </Button>
          {explanation && (
            <div className="bg-muted/10 rounded-xl p-4 border border-white/5 text-[11px] leading-relaxed opacity-80 animate-in slide-in-from-top-2">
              {explanation}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
