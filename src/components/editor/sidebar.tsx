"use client"

import { FileCode, Plus, FolderOpen, Settings, Zap, BookOpen, Search, Menu, ChevronDown, ChevronRight, GitBranch, LayoutGrid, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import type { FileItem } from "@/hooks/use-editor-store"

interface SidebarProps {
  files: FileItem[]
  activeFileId: string
  onFileSelect: (id: string) => void
  onNewFile: () => void
  onDeleteFile: (id: string) => void
}

export function EditorSidebar({ files, activeFileId, onFileSelect, onNewFile, onDeleteFile }: SidebarProps) {
  return (
    <div className="flex h-full">
      {/* Activity Bar (Slim Left) */}
      <div className="w-12 bg-[#0A0A0A] border-r flex flex-col items-center py-4 gap-4">
        <TooltipProvider>
          <ActivityIcon icon={<LayoutGrid className="h-5 w-5" />} active tooltip="Explorer" />
          <ActivityIcon icon={<Search className="h-5 w-5" />} tooltip="Search" />
          <ActivityIcon icon={<GitBranch className="h-5 w-5" />} tooltip="Source Control" />
          <ActivityIcon icon={<Zap className="h-5 w-5" />} tooltip="Extensions" />
          <div className="mt-auto flex flex-col gap-4">
            <ActivityIcon icon={<Settings className="h-5 w-5" />} tooltip="Settings" />
          </div>
        </TooltipProvider>
      </div>

      {/* Explorer Panel */}
      <div className="w-60 border-r bg-[#111111] flex flex-col h-full overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Explorer</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onNewFile}>
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <FolderOpen className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-2">
            <div className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold text-foreground/80 group cursor-pointer hover:bg-white/5 rounded-sm transition-colors mx-1">
              <ChevronDown className="h-3 w-3" />
              <span>PROJECT-WORKSPACE</span>
            </div>
            
            <div className="mt-1 space-y-0.5">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "group w-full flex items-center gap-2 px-4 py-1.5 text-xs transition-colors cursor-pointer relative",
                    activeFileId === file.id 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => onFileSelect(file.id)}
                >
                  {activeFileId === file.id && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />}
                  <FileCode className={cn("h-4 w-4 shrink-0", activeFileId === file.id ? "text-primary" : "text-muted-foreground/60")} />
                  <span className="truncate flex-1">{file.name}</span>
                  <button 
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteFile(file.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function ActivityIcon({ icon, active, tooltip }: { icon: React.ReactNode, active?: boolean, tooltip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(
          "cursor-pointer p-2 rounded-md transition-all relative group",
          active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}>
          {active && <div className="absolute left-[-12px] top-1 bottom-1 w-0.5 bg-primary rounded-full" />}
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-popover border-border text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}