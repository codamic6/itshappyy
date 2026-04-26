"use client"

import { useState, useRef, useEffect } from 'react'
import { Sparkles, HelpCircle, Code2, Loader2, Send, Copy, Check, MessageSquare, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { aiCodeGeneration } from '@/ai/flows/ai-code-generation-flow'
import { aiCodeExplanation } from '@/ai/flows/ai-code-explanation.ts'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIPanels({ selectedText, onGeneratedCode }: { selectedText: string, onGeneratedCode: (code: string) => void }) {
  const [genPrompt, setGenPrompt] = useState('')
  const [chatPrompt, setChatPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your Caret AI assistant. How can I help you code today?" }
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExplaining, setIsExplaining] = useState(false)
  const [isChatting, setIsChatting] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleGenerate = async () => {
    if (!genPrompt) return
    setIsGenerating(true)
    try {
      const result = await aiCodeGeneration({ description: genPrompt })
      onGeneratedCode(result.code)
      setGenPrompt('')
      toast({ title: "Code generated" })
    } catch (err) {
      toast({ variant: 'destructive', title: "Generation failed" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExplain = async () => {
    if (!selectedText) {
      toast({ title: "Select code first" })
      return
    }
    setIsExplaining(true)
    try {
      const result = await aiCodeExplanation({ code: selectedText })
      setExplanation(result.explanation)
    } catch (err) {
      toast({ variant: 'destructive', title: "Explanation failed" })
    } finally {
      setIsExplaining(false)
    }
  }

  const handleChat = async () => {
    if (!chatPrompt) return
    const userMsg = chatPrompt
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setChatPrompt('')
    setIsChatting(true)
    
    try {
      // Re-using generation flow for simple chat behavior
      const result = await aiCodeGeneration({ 
        description: `Answer this question about coding: ${userMsg}. Context if any: ${selectedText}` 
      })
      setMessages(prev => [...prev, { role: 'assistant', content: result.code }])
    } catch (err) {
      toast({ variant: 'destructive', title: "Chat failed" })
    } finally {
      setIsChatting(false)
    }
  }

  return (
    <div className="w-80 border-l bg-[#0D0D0D] flex flex-col h-full overflow-hidden shadow-2xl">
      <div className="p-4 border-b flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-2 font-headline font-semibold text-primary">
          <Sparkles className="h-4 w-4" />
          <span>CARET AI</span>
        </div>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-2 pt-2 border-b bg-muted/20">
          <TabsList className="w-full bg-transparent p-0 flex h-9">
            <TabsTrigger value="chat" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-background">
              <MessageSquare className="h-3.5 w-3.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-background">
              <Code2 className="h-3.5 w-3.5" />
              Gen
            </TabsTrigger>
            <TabsTrigger value="explain" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-background">
              <HelpCircle className="h-3.5 w-3.5" />
              Help
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-2 max-w-[90%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", m.role === 'user' ? "bg-accent" : "bg-primary")}>
                    {m.role === 'user' ? <div className="text-[10px]">U</div> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={cn("rounded-lg p-2 text-xs leading-relaxed", m.role === 'user' ? "bg-accent/20 border border-accent/30" : "bg-muted/50 border border-border")}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isChatting && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-xs border border-border">Thinking...</div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-card/30">
            <div className="relative">
              <Textarea 
                placeholder="Ask anything..."
                className="min-h-[60px] max-h-[120px] bg-background border-border resize-none text-[12px] focus-visible:ring-primary pr-10"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleChat())}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-2 bottom-2 h-7 w-7 text-primary"
                onClick={handleChat}
                disabled={isChatting || !chatPrompt}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="generate" className="flex-1 p-4 flex flex-col gap-4 m-0 overflow-y-auto">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Generate Code</h3>
            <p className="text-[11px] text-muted-foreground">Describe a function or component to build.</p>
            <Textarea 
              placeholder="e.g. A React hook for local storage management..."
              className="min-h-[100px] bg-muted/20 border-border resize-none text-xs"
              value={genPrompt}
              onChange={(e) => setGenPrompt(e.target.value)}
            />
            <Button 
              className="w-full gap-2 bg-primary hover:bg-primary/90 text-xs h-9" 
              onClick={handleGenerate} 
              disabled={isGenerating || !genPrompt}
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isGenerating ? 'Drafting...' : 'Build Now'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="explain" className="flex-1 flex flex-col overflow-hidden m-0">
          <div className="p-4 space-y-4 flex flex-col flex-1 overflow-hidden">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Logic Analysis</h3>
              <p className="text-[11px] text-muted-foreground">Get a clear breakdown of selected logic.</p>
              <Button 
                variant="outline" 
                className="w-full gap-2 border-primary/30 hover:bg-primary/10 text-xs h-9" 
                onClick={handleExplain}
                disabled={isExplaining}
              >
                {isExplaining ? <Loader2 className="h-4 w-4 animate-spin" /> : <HelpCircle className="h-4 w-4" />}
                {isExplaining ? 'Analyzing...' : 'Explain Selected'}
              </Button>
            </div>
            
            {explanation && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Analysis</h4>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                    navigator.clipboard.writeText(explanation)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}>
                    {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <ScrollArea className="flex-1 bg-muted/20 rounded-md p-3 border border-border">
                  <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{explanation}</p>
                </ScrollArea>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}