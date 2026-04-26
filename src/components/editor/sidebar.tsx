
"use client"

import { useState, useRef, useEffect } from "react"
import { FileCode, Plus, LayoutGrid, Search, GitBranch, Zap, Settings, ChevronDown, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useEditorStore } from "@/hooks/use-editor-store"

interface SidebarProps {
  onNewFile: () => void
}

export function EditorSidebar({ onNewFile }: SidebarProps) {
  const store = useEditorStore()
  const [newFileName, setNewFileName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const files = Object.values(store.files)

  useEffect(() => {
    if (store.isCreatingFile && inputRef.current) {
      inputRef.current.focus()
    }
  }, [store.isCreatingFile])

  const handleCreateConfirm = () => {
    if (newFileName.trim()) {
      store.createFile(newFileName)
    }
    setNewFileName("")
    store.setIsCreatingFile(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateConfirm()
    } else if (e.key === "Escape") {
      setNewFileName("")
      store.setIsCreatingFile(false)
    }
  }

  return (
    <div className="flex h-full border-r bg-[#0A0A0A] select-none">
      <div className="w-12 bg-black/40 flex flex-col items-center py-4 gap-4 border-r border-white/5">
        <TooltipProvider>
          <ActivityIcon icon={<LayoutGrid className="h-5 w-5" />} active tooltip="Explorer" />
          <ActivityIcon icon={<Search className="h-5 w-5" />} tooltip="Search" />
          <ActivityIcon icon={<GitBranch className="h-5 w-5" />} tooltip="Source Control" />
          <ActivityIcon icon={<Zap className="h-5 w-5" />} tooltip="Extensions" />
          <div className="mt-auto">
            <ActivityIcon icon={<Settings className="h-5 w-5" />} tooltip="Settings" />
          </div>
        </TooltipProvider>
      </div>

      <div className="w-60 flex flex-col h-full overflow-hidden bg-[#0D0D0D]">
        <div className="p-3 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Explorer</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/5" onClick={onNewFile}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-2">
            <div className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest group cursor-pointer hover:bg-white/5 rounded mx-1 transition-colors">
              <ChevronDown className="h-3 w-3" />
              <span>Workspace</span>
            </div>
            
            <div className="mt-1 space-y-0.5">
              {/* Inline Input for New File - Appears directly under Workspace */}
              {store.isCreatingFile && (
                <div className="px-4 py-1.5 flex items-center gap-2 bg-primary/10 border-y border-primary/30 animate-in fade-in slide-in-from-top-1 z-20">
                  <FileCode className="h-4 w-4 text-primary shrink-0" />
                  <input
                    ref={inputRef}
                    className="flex-1 bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground/50 p-0 h-4"
                    placeholder="index.html"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                      if (newFileName.trim()) handleCreateConfirm();
                      else store.setIsCreatingFile(false);
                    }}
                  />
                </div>
              )}

              {files.length === 0 && !store.isCreatingFile ? (
                <div className="px-6 py-10 text-center space-y-3 opacity-40">
                  <FileCode className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[9px] uppercase tracking-widest">Empty Workspace</p>
                </div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className={cn(
                      "group w-full flex items-center gap-2 px-4 py-1.5 text-xs transition-colors cursor-pointer relative",
                      store.activeFileId === file.id 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => store.selectFile(file.id)}
                  >
                    {store.activeFileId === file.id && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />}
                    <FileCode className={cn("h-4 w-4 shrink-0", store.activeFileId === file.id ? "text-primary" : "text-muted-foreground/60")} />
                    <span className="truncate flex-1">{file.name}</span>
                    <button 
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        store.deleteFile(file.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
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
