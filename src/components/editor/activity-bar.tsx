"use client"

import { Files, Search, GitBranch, Blocks, Bot, Settings, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEditorStore } from '@/hooks/use-editor-store'

interface ActivityBarProps {
  activeView: string
  onViewChange: (view: any) => void
}

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  const store = useEditorStore()

  return (
    <div className="w-[50px] bg-black border-r border-white/5 flex flex-col items-center py-6 gap-6 z-50 relative">
      <TooltipProvider delayDuration={0}>
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
          label="Marketplace"
        />
        <ActivityIcon 
          icon={<Bot className="h-4 w-4" />} 
          active={activeView === 'ai'} 
          onClick={() => onViewChange('ai')}
          label="Intelligence"
        />
        
        <div className="mt-auto flex flex-col gap-6">
          <ActivityIcon icon={<User className="h-4 w-4" />} label="Identity" />
          <ActivityIcon 
            icon={<Settings className="h-4 w-4" />} 
            label="Hardware" 
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
            "p-2 rounded transition-all relative group",
            active ? "text-white active-glow" : "text-white/20 hover:text-white/60"
          )}
        >
          {active && (
            <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[2px] h-6 bg-white shadow-[0_0_10px_white]" />
          )}
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-black border-white/10 text-[9px] font-future uppercase tracking-[0.2em] p-2">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}