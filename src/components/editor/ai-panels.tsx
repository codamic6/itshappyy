
"use client"

import { useState, useRef, useEffect } from 'react'
import { Sparkles, HelpCircle, Code2, Loader2, Send, Bot, MessageSquare, Zap } from 'lucide-react'
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
    { role: 'assistant', content: "Hello! I'm Caret AI. I'm connected to Gemini 2.5. How can I assist your coding today?" }
  ])
  const [isBusy, setIsBusy] = useState(false)
  const [explanation, setExplanation] = useState('')
  const { toast } = useToast()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const handleChat = async () => {
    if (!chatPrompt.trim()) return
    const userMsg = chatPrompt.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setChatPrompt('')
    setIsBusy(true)

    try {
      const context = activeFileContent ? `\n\nContext from active file:\n\`\`\`\n${activeFileContent}\n\`\`\`` : ""
      const result = await aiCodeGeneration({ 
        description: `As a professional coding expert, answer this: ${userMsg}. ${context}` 
      })
      setMessages(prev => [...prev, { role: 'assistant', content: result.code }])
    } catch (err) {
      toast({ variant: 'destructive', title: "Gemini connection failed" })
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
      toast({ title: "Code generated and inserted" })
    } catch (err) {
      toast({ variant: 'destructive', title: "Generation failed" })
    } finally {
      setIsBusy(false)
    }
  }

  const handleExplain = async () => {
    if (!selectedText) {
      toast({ title: "Please select code in the editor first" })
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
    <div className="w-80 flex flex-col h-full overflow-hidden bg-[#0A0A0A] shadow-2xl animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center animate-pulse">
            <Zap className="h-3 w-3 text-white" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-primary uppercase">Caret AI Assistant</span>
        </div>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full bg-transparent p-1 h-10 border-b border-white/5 gap-1">
          <TabsTrigger value="chat" className="flex-1 text-[10px] gap-1.5 uppercase font-bold tracking-tighter cursor-pointer data-[state=active]:bg-primary/20"><MessageSquare className="h-3 w-3" />Chat</TabsTrigger>
          <TabsTrigger value="gen" className="flex-1 text-[10px] gap-1.5 uppercase font-bold tracking-tighter cursor-pointer data-[state=active]:bg-primary/20"><Code2 className="h-3 w-3" />Build</TabsTrigger>
          <TabsTrigger value="help" className="flex-1 text-[10px] gap-1.5 uppercase font-bold tracking-tighter cursor-pointer data-[state=active]:bg-primary/20"><HelpCircle className="h-3 w-3" />Logic</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-2 max-w-[95%] animate-in fade-in slide-in-from-bottom-2", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-lg", m.role === 'user' ? "bg-accent" : "bg-primary")}>
                    {m.role === 'user' ? <div className="text-[10px] font-bold">U</div> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={cn("rounded-2xl p-3 text-[11px] leading-relaxed shadow-sm", m.role === 'user' ? "bg-accent/10 border border-accent/20 text-accent-foreground" : "bg-muted/30 border border-white/5")}>
                    <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                  </div>
                </div>
              ))}
              {isBusy && (
                <div className="flex gap-2 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-3 text-[10px] border border-white/5 italic opacity-50">Caret AI is processing...</div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-white/5 bg-black/40">
            <div className="relative group">
              <Textarea 
                placeholder="Ask anything about coding..."
                className="min-h-[70px] max-h-[150px] bg-background border-white/10 resize-none text-[11px] pr-10 focus:border-primary/50 transition-all rounded-xl shadow-inner"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleChat())}
              />
              <Button size="icon" variant="ghost" className="absolute right-2 bottom-2 h-8 w-8 text-primary hover:bg-primary/10 transition-colors" onClick={handleChat} disabled={isBusy || !chatPrompt.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gen" className="flex-1 p-5 space-y-6 m-0 overflow-y-auto">
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Generate Module</h3>
            </div>
            <Textarea 
              placeholder="e.g. 'Create a React dashboard component with charts'..."
              className="min-h-[150px] bg-background border-white/10 text-[11px] rounded-xl"
              value={genPrompt}
              onChange={(e) => setGenPrompt(e.target.value)}
            />
            <Button className="w-full h-10 text-[11px] font-bold uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.3)]" onClick={handleGenerate} disabled={isBusy || !genPrompt.trim()}>
              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Build with AI
            </Button>
            <p className="text-[9px] text-center text-muted-foreground italic">Code will be appended to your active file.</p>
          </div>
        </TabsContent>

        <TabsContent value="help" className="flex-1 p-5 space-y-6 m-0 overflow-y-auto">
          <div className="space-y-4 animate-in fade-in duration-500">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Analyze Logic</h3>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
              <p className="text-[10px] text-muted-foreground leading-relaxed">Highlight a piece of code in the editor and click the button below to get a deep dive explanation of its functionality.</p>
              <Button variant="outline" className="w-full h-10 text-[11px] font-bold uppercase tracking-widest border-primary/20 hover:bg-primary/10 gap-2" onClick={handleExplain} disabled={isBusy}>
                {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <HelpCircle className="h-4 w-4" />}
                Explain Selection
              </Button>
            </div>
            {explanation && (
              <div className="bg-muted/10 rounded-xl p-4 border border-white/5 animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">AI Analysis</span>
                </div>
                <p className="text-[11px] leading-relaxed whitespace-pre-wrap opacity-80">{explanation}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
