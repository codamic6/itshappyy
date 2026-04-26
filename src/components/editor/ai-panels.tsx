
"use client"

import { useState, useRef, useEffect } from 'react'
import { Sparkles, HelpCircle, Code2, Loader2, Send, Bot, MessageSquare } from 'lucide-react'
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
    { role: 'assistant', content: "Hello! I'm Caret AI. How can I help with your code today?" }
  ])
  const [isBusy, setIsBusy] = useState(false)
  const [explanation, setExplanation] = useState('')
  const { toast } = useToast()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const isCodingTask = (text: string) => {
    const codeKeywords = ['code', 'function', 'build', 'create', 'write', 'fix', 'debug', 'how', 'component', 'script', 'react', 'typescript', 'js', 'py']
    return codeKeywords.some(k => text.toLowerCase().includes(k))
  }

  const handleChat = async () => {
    if (!chatPrompt.trim()) return
    const userMsg = chatPrompt.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setChatPrompt('')
    setIsBusy(true)

    if (!isCodingTask(userMsg)) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I am specialized in coding tasks. Please describe a coding problem or task you'd like help with." }])
      setIsBusy(false)
      return
    }

    try {
      const context = activeFileContent ? `Current file context:\n${activeFileContent}` : ""
      const result = await aiCodeGeneration({ 
        description: `As a coding assistant, answer this: ${userMsg}. ${context}` 
      })
      setMessages(prev => [...prev, { role: 'assistant', content: result.code }])
    } catch (err) {
      toast({ variant: 'destructive', title: "Chat error" })
    } finally {
      setIsBusy(false)
    }
  }

  const handleGenerate = async () => {
    if (!genPrompt.trim()) return
    setIsBusy(true)
    try {
      const result = await aiCodeGeneration({ description: genPrompt })
      onGeneratedCode(result.code)
      setGenPrompt('')
      toast({ title: "Code generated" })
    } catch (err) {
      toast({ variant: 'destructive', title: "Generation failed" })
    } finally {
      setIsBusy(false)
    }
  }

  const handleExplain = async () => {
    if (!selectedText) {
      toast({ title: "No code selected" })
      return
    }
    setIsBusy(true)
    try {
      const result = await aiCodeExplanation({ code: selectedText })
      setExplanation(result.explanation)
    } catch (err) {
      toast({ variant: 'destructive', title: "Explanation failed" })
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="w-80 border-l bg-[#0D0D0D] flex flex-col h-full overflow-hidden shadow-2xl">
      <div className="p-4 border-b flex items-center gap-2 bg-card/20">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold tracking-widest text-primary">CARET AI</span>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full bg-transparent p-1 h-10 border-b border-white/5">
          <TabsTrigger value="chat" className="flex-1 text-xs gap-1.5 cursor-pointer"><MessageSquare className="h-3 w-3" />Chat</TabsTrigger>
          <TabsTrigger value="gen" className="flex-1 text-xs gap-1.5 cursor-pointer"><Code2 className="h-3 w-3" />Build</TabsTrigger>
          <TabsTrigger value="help" className="flex-1 text-xs gap-1.5 cursor-pointer"><HelpCircle className="h-3 w-3" />Help</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-2 max-w-[95%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", m.role === 'user' ? "bg-accent" : "bg-primary")}>
                    {m.role === 'user' ? <div className="text-[10px]">U</div> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={cn("rounded-lg p-2 text-[11px] leading-relaxed", m.role === 'user' ? "bg-accent/10 border border-accent/20" : "bg-muted/30 border border-white/5")}>
                    <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                  </div>
                </div>
              ))}
              {isBusy && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="bg-muted/30 rounded-lg p-2 text-[10px] border border-white/5">Caret AI is thinking...</div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-black/20">
            <div className="relative">
              <Textarea 
                placeholder="Ask a coding question..."
                className="min-h-[60px] max-h-[120px] bg-background border-white/5 resize-none text-[11px] pr-10"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleChat())}
              />
              <Button size="icon" variant="ghost" className="absolute right-2 bottom-2 h-7 w-7 text-primary" onClick={handleChat} disabled={isBusy || !chatPrompt.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gen" className="flex-1 p-4 space-y-4 m-0">
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Generate Code</h3>
            <Textarea 
              placeholder="e.g. Create a React hook for API calls..."
              className="min-h-[120px] bg-background border-white/5 text-[11px]"
              value={genPrompt}
              onChange={(e) => setGenPrompt(e.target.value)}
            />
            <Button className="w-full h-9 text-xs gap-2" onClick={handleGenerate} disabled={isBusy || !genPrompt.trim()}>
              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Build Module
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="help" className="flex-1 p-4 space-y-4 m-0 overflow-y-auto">
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Logic Analysis</h3>
            <Button variant="outline" className="w-full h-9 text-xs border-primary/20 hover:bg-primary/5 gap-2" onClick={handleExplain} disabled={isBusy}>
              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <HelpCircle className="h-4 w-4" />}
              Explain Selected Code
            </Button>
            {explanation && (
              <div className="bg-muted/20 rounded-md p-3 border border-white/5">
                <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{explanation}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
