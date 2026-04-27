"use client"

import { useState, useRef, useEffect } from 'react'
import { X, ChevronRight, SquareTerminal, Terminal as TerminalIcon, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TerminalProps {
  history: any[]
  onExecute: (cmd: string) => void
  onClose: () => void
}

export function Terminal({ history, onExecute, onClose }: TerminalProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  return (
    <div className="flex-1 border-t border-white/5 bg-[#0C0C0E] flex flex-col z-20">
      <div className="h-9 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.01]">
        <div className="flex items-center gap-6 h-full">
          <TabItem active icon={<TerminalIcon className="h-3 w-3" />}>Terminal</TabItem>
          <TabItem>Output</TabItem>
          <TabItem>Debug Console</TabItem>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-white text-muted-foreground/30" onClick={onClose}>
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-white text-muted-foreground/30" onClick={onClose}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 font-mono text-[12px] overflow-y-auto no-scrollbar bg-[#0C0C0E]" ref={scrollRef}>
        <div className="space-y-1 text-muted-foreground/60">
          <div className="text-[9px] font-future text-white/10 mb-6 uppercase tracking-[0.4em]">CARET.SHELL.ENV.STABLE</div>
          {history.map((line, i) => (
            <div key={i} className={cn(
              "leading-relaxed break-all font-future text-[11px]",
              line.type === 'error' ? 'text-red-400/40' : 
              line.type === 'input' ? 'text-white/80 font-bold' : ''
            )}>
              {line.type === 'input' && <span className="mr-2 text-white/10">CARET:~$</span>}
              {line.content}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <ChevronRight className="h-3 w-3 text-white/10 animate-pulse" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-white font-future p-0 text-[11px]"
              placeholder="COMMAND..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (onExecute(input), setInput(''))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function TabItem({ children, active, icon }: any) {
  return (
    <div className={cn(
      "flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] cursor-pointer h-full border-b transition-all pt-1 px-2",
      active ? "text-white border-white/20" : "text-white/10 hover:text-white/30 border-transparent"
    )}>
      {icon}
      <span>{children}</span>
    </div>
  )
}