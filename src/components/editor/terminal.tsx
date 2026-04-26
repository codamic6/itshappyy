
"use client"

import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/hooks/use-editor-store'
import { cn } from '@/lib/utils'

export function Terminal() {
  const store = useEditorStore()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [store.terminalHistory])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      store.executeCommand(input)
      setInput('')
    }
  }

  return (
    <div className="h-64 border-t bg-[#0c0c0e] flex flex-col z-20">
      <div className="h-9 border-b flex items-center justify-between px-4 bg-muted/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b-2 border-primary h-full px-1 pt-1">
            <TerminalIcon className="h-3 w-3" />
            <span>Terminal</span>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 hover:text-muted-foreground cursor-pointer transition-colors">
            Output
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 hover:text-muted-foreground cursor-pointer transition-colors">
            Debug Console
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-destructive/20" onClick={() => store.setIsTerminalOpen(false)}>
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex-1 p-4 font-code text-[12px] overflow-y-auto no-scrollbar" ref={scrollRef}>
        <div className="space-y-1">
          {store.terminalHistory.map((line, i) => (
            <div key={i} className={cn(
              line.type === 'error' ? 'text-red-400' : 
              line.type === 'input' ? 'text-primary' : 'text-muted-foreground'
            )}>
              {line.content}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <ChevronRight className="h-4 w-4 text-primary" />
          <input 
            autoFocus
            className="flex-1 bg-transparent border-none focus:ring-0 outline-none p-0 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  )
}
