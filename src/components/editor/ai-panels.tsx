
"use client"

import { useState } from 'react'
import { Sparkles, HelpCircle, Code2, Loader2, Send, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { aiCodeGeneration } from '@/ai/flows/ai-code-generation-flow'
import { aiCodeExplanation } from '@/ai/flows/ai-code-explanation.ts'
import { useToast } from '@/hooks/use-toast'

export function AIPanels({ selectedText, onGeneratedCode }: { selectedText: string, onGeneratedCode: (code: string) => void }) {
  const [genPrompt, setGenPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExplaining, setIsExplaining] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!genPrompt) return
    setIsGenerating(true)
    try {
      const result = await aiCodeGeneration({ description: genPrompt })
      onGeneratedCode(result.code)
      setGenPrompt('')
      toast({ title: "Code generated successfully" })
    } catch (err) {
      toast({ variant: 'destructive', title: "Failed to generate code" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExplain = async () => {
    if (!selectedText) {
      toast({ title: "Please select some code to explain" })
      return
    }
    setIsExplaining(true)
    try {
      const result = await aiCodeExplanation({ code: selectedText })
      setExplanation(result.explanation)
    } catch (err) {
      toast({ variant: 'destructive', title: "Failed to explain code" })
    } finally {
      setIsExplaining(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-80 border-l bg-card flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-2 font-headline font-semibold text-primary">
        <Sparkles className="h-4 w-4" />
        <span>AI Assistant</span>
      </div>

      <Tabs defaultValue="generate" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-2 pt-2 border-b bg-muted/20">
          <TabsList className="w-full bg-transparent p-0 flex">
            <TabsTrigger value="generate" className="flex-1 gap-1.5 data-[state=active]:bg-background">
              <Code2 className="h-3.5 w-3.5" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="explain" className="flex-1 gap-1.5 data-[state=active]:bg-background">
              <HelpCircle className="h-3.5 w-3.5" />
              Explain
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generate" className="flex-1 p-4 flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Describe what you want to build and let AI handle the coding.</p>
            <Textarea 
              placeholder="e.g. Create a React component for a data table with sorting..."
              className="min-h-[120px] bg-muted/30 border-muted resize-none text-sm focus:ring-1 focus:ring-primary"
              value={genPrompt}
              onChange={(e) => setGenPrompt(e.target.value)}
            />
            <Button 
              className="w-full gap-2" 
              onClick={handleGenerate} 
              disabled={isGenerating || !genPrompt}
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isGenerating ? 'Generating...' : 'Generate Code'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="explain" className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 space-y-4 flex flex-col flex-1 overflow-hidden">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Select code in the editor and click Explain to understand its logic.</p>
              <Button 
                variant="secondary" 
                className="w-full gap-2 border border-primary/20 hover:border-primary/50" 
                onClick={handleExplain}
                disabled={isExplaining}
              >
                {isExplaining ? <Loader2 className="h-4 w-4 animate-spin" /> : <HelpCircle className="h-4 w-4" />}
                {isExplaining ? 'Analyzing...' : 'Explain Selection'}
              </Button>
            </div>
            
            {explanation && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Analysis Result</h4>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
                    {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <ScrollArea className="flex-1 bg-muted/20 rounded-md p-3 border">
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">{explanation}</p>
                </ScrollArea>
              </div>
            )}

            {!explanation && !isExplaining && (
              <div className="flex-1 flex items-center justify-center flex-col opacity-50 space-y-2">
                <HelpCircle className="h-12 w-12 text-muted-foreground" />
                <p className="text-xs text-center max-w-[150px]">Select code and get an instant explanation</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
