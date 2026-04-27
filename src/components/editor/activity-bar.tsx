"use client"

import { Files, Search, GitBranch, Blocks, Bot, Settings, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEditorStore } from '@/hooks/use-editor-store'

interface ActivityBarProps {
  activeView: string
  onViewChange: (view: any) => void
  side?: 'left' | 'right'
}

export function ActivityBar({ activeView, onViewChange, side = 'left' }: ActivityBarProps) {
  const store = useEditorStore()

  return (
    <div className={cn(
      "w-[50px] bg-black flex flex-col items-center py-4 gap-4 z-50 relative",
      side === 'left' ? "border-r border-white/5" : "border-l border-white/5"
    )}>
      <TooltipProvider delayDuration={0}>
        {side === 'left' ? (
          <>
            <ActivityIcon 
              icon={<Files className="h-4 w-4" />} 
              active={activeView === 'explorer'} 
              onClick={() => onViewChange('explorer')}
              label="Explorer"
            />
            <ActivityIcon 
              icon={<Search className="h-4 w-4" />} 
              active={activeView === 'search'} 
              onClick={() => onViewChange('search')}
              label="Search"
            />
            <ActivityIcon 
              icon={<GitBranch className="h-4 w-4" />} 
              active={activeView === 'git'} 
              onClick={() => onViewChange('git')}
              label="Source Control"
            />
            <ActivityIcon 
              icon={<Blocks className="h-4 w-4" />} 
              active={activeView === 'extensions'} 
              onClick={() => onViewChange('extensions')}
              label="Extensions"
            />
          </>
        ) : (
          <ActivityIcon 
            icon={<Bot className="h-4 w-4" />} 
            active={activeView === 'ai'} 
            onClick={() => onViewChange('ai')}
            label="Intelligence"
          />
        )}
        
        <div className="mt-auto flex flex-col gap-4">
          <ActivityIcon icon={<User className="h-4 w-4" />} label="Identity" />
          <ActivityIcon 
            icon={<Settings className="h-4 w-4" />} 
            label="Settings" 
            onClick={() => store.setIsSettingsOpen(true)}
          />
        </div>
      </TooltipProvider>
    </div>
  )
}

function ActivityIcon({ icon, active, onClick, label }: any) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          onClick={onClick}
          className={cn(
            "p-2.5 rounded transition-all relative group",
            active ? "text-white" : "text-white/20 hover:text-white/50"
          )}
        >
          {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-white shadow-[0_0_10px_white]" />
          )}
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-black border-white/10 text-[9px] font-future uppercase tracking-widest p-2">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}