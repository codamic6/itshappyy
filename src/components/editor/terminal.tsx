
"use client"

import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, X, ChevronRight, SquareTerminal } from 'lucide-react'
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
    <div className="h-64 border-t border-white/5 bg-[#0A0A0A] flex flex-col z-20 animate-in slide-in-from-bottom duration-300">
      <div className="h-9 border-b border-white/5 flex items-center justify-between px-4 bg-black/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b-2 border-primary h-full px-1 pt-1.5">
            <SquareTerminal className="h-3 w-3" />
            <span>Terminal</span>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 hover:text-muted-foreground cursor-pointer transition-colors pt-1">
            Output
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 hover:text-muted-foreground cursor-pointer transition-colors pt-1">
            Debug Console
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-destructive/20 text-muted-foreground" onClick={() => store.setIsTerminalOpen(false)}>
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 font-code text-[12px] overflow-y-auto no-scrollbar bg-[#0D0D0D]" ref={scrollRef}>
        <div className="space-y-1.5">
          <div className="text-muted-foreground/50 text-[10px] mb-4">
            [CARET TERMINAL v1.0.0] - Secure Shell Active
          </div>
          {store.terminalHistory.map((line, i) => (
            <div key={i} className={cn(
              "leading-relaxed",
              line.type === 'error' ? 'text-red-400' : 
              line.type === 'input' ? 'text-primary font-bold' : 'text-muted-foreground/90'
            )}>
              {line.type === 'input' ? <span>{'>'} </span> : null}
              {line.content}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 group">
          <ChevronRight className="h-4 w-4 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity" />
          <input 
            autoFocus
            className="flex-1 bg-transparent border-none focus:ring-0 outline-none p-0 text-white placeholder:text-white/5"
            placeholder="Type 'help' to see available commands..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  )
}
