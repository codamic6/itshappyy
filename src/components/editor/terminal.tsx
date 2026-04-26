"use client"

import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TerminalProps {
  onClose: () => void
}

export function Terminal({ onClose }: TerminalProps) {
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
        <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-destructive/20" onClick={onClose}>
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex-1 p-4 font-code text-sm overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-2 text-primary mb-2">
          <ChevronRight className="h-4 w-4" />
          <span>caret@workspace:~/project$ npm start</span>
        </div>
        <div className="text-muted-foreground space-y-1">
          <p>{'>'} caret-editor@0.1.0 start</p>
          <p>{'>'} next dev</p>
          <p className="text-green-500/80">ready - started server on 0.0.0.0:3000, url: http://localhost:3000</p>
          <p className="text-blue-400">event - compiled successfully</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <ChevronRight className="h-4 w-4 text-primary" />
          <div className="w-2 h-5 bg-primary/60 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
