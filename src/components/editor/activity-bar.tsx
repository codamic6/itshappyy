
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
    <div className="w-[60px] bg-black border-r border-white/5 flex flex-col items-center py-4 gap-4 z-50">
      <TooltipProvider>
        <ActivityIcon 
          icon={<Files className="h-5 w-5" />} 
          active={activeView === 'explorer'} 
          onClick={() => onViewChange('explorer')}
          label="Explorer"
        />
        <ActivityIcon 
          icon={<Search className="h-5 w-5" />} 
          active={activeView === 'search'} 
          onClick={() => onViewChange('search')}
          label="Search"
        />
        <ActivityIcon 
          icon={<GitBranch className="h-5 w-5" />} 
          active={activeView === 'git'} 
          onClick={() => onViewChange('git')}
          label="Source Control"
        />
        <ActivityIcon 
          icon={<Blocks className="h-5 w-5" />} 
          active={activeView === 'extensions'} 
          onClick={() => onViewChange('extensions')}
          label="Extensions"
        />
        <ActivityIcon 
          icon={<Bot className="h-5 w-5" />} 
          active={activeView === 'ai'} 
          onClick={() => onViewChange('ai')}
          label="AI Logic"
        />
        
        <div className="mt-auto flex flex-col gap-4">
          <ActivityIcon icon={<User className="h-5 w-5" />} label="Account" />
          <ActivityIcon 
            icon={<Settings className="h-5 w-5" />} 
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
            "p-3 rounded-lg transition-all relative group",
            active ? "text-white" : "text-muted-foreground hover:text-white"
          )}
        >
          {active && <div className="absolute left-[-15px] top-3 bottom-3 w-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />}
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-black border-white/10 text-[10px] font-bold uppercase tracking-widest">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
