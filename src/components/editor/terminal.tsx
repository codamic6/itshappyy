
"use client"

import { useState, useRef, useEffect } from 'react'
import { X, ChevronRight, SquareTerminal, Terminal as TerminalIcon } from 'lucide-react'
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
    <div className="h-64 border-t border-white/5 bg-[#0A0D12] flex flex-col z-20">
      <div className="h-9 border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-6 h-full">
          <TabItem active icon={<TerminalIcon className="h-3 w-3" />}>Terminal</TabItem>
          <TabItem>Output</TabItem>
          <TabItem>Debug Console</TabItem>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 font-mono text-[12px] overflow-y-auto no-scrollbar bg-[#0D1117]" ref={scrollRef}>
        <div className="space-y-1 text-muted-foreground/80">
          <div className="text-[10px] font-bold text-primary mb-4 opacity-50 uppercase tracking-[0.3em]">Caret Shell Environment v1.0</div>
          {history.map((line, i) => (
            <div key={i} className={cn(
              "leading-relaxed break-all",
              line.type === 'error' ? 'text-red-400' : 
              line.type === 'input' ? 'text-primary font-bold' : ''
            )}>
              {line.type === 'input' && <span className="mr-2">caret@workspace:~$</span>}
              {line.content}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <ChevronRight className="h-3 w-3 text-primary animate-pulse" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-foreground p-0"
              placeholder="Type command..."
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
      "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer h-full border-b-2 transition-all pt-1 px-1",
      active ? "text-primary border-primary" : "text-muted-foreground/40 hover:text-muted-foreground border-transparent"
    )}>
      {icon}
      <span>{children}</span>
    </div>
  )
}
