
"use client"

import { useState, useRef, useEffect } from "react"
import { FileCode, Plus, ChevronDown, Trash2, FolderPlus, FilePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEditorStore } from "@/hooks/use-editor-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  onNewFile: () => void
}

export function EditorSidebar({ onNewFile }: SidebarProps) {
  const store = useEditorStore()
  const [newFileName, setNewFileName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const files = Object.values(store.files)

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isCreating])

  const handleCreate = () => {
    if (newFileName.trim()) {
      store.createFile(newFileName.trim())
    }
    setNewFileName("")
    setIsCreating(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate()
    } else if (e.key === 'Escape') {
      setNewFileName("")
      setIsCreating(false)
    }
  }

  return (
    <div className="w-full flex flex-col h-full bg-[#0D1117] select-none animate-in slide-in-from-left duration-300">
      <div className="p-3 h-12 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Explorer</span>
        <div className="flex items-center gap-0.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-white/5" 
                  onClick={() => setIsCreating(true)}
                >
                  <FilePlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-[10px] bg-black border-white/10">New File</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-white/5"
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-[10px] bg-black border-white/10">New Folder</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          <div className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
            <ChevronDown className="h-3 w-3" />
            <span>Workspace</span>
          </div>
          
          <div className="mt-1 space-y-0.5 px-1">
            {isCreating && (
              <div className="px-3 py-1.5 flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-md mx-1 mb-1">
                <FileCode className="h-4 w-4 text-primary shrink-0" />
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-foreground p-0 placeholder:text-muted-foreground/40"
                  placeholder="name.extension (e.g. index.html)"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => {
                    if (!newFileName.trim()) setIsCreating(false)
                  }}
                />
              </div>
            )}

            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer transition-all rounded-md mx-1",
                    store.activeFileId === file.id 
                      ? "bg-primary/20 text-primary border-l-2 border-primary" 
                      : "text-muted-foreground hover:bg-white/5 border-l-2 border-transparent"
                  )}
                  onClick={() => store.selectFile(file.id)}
                >
                  <FileCode className={cn("h-4 w-4 shrink-0", store.activeFileId === file.id ? "text-primary" : "text-muted-foreground/40")} />
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
            ) : !isCreating && (
              <div className="px-4 py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4 text-muted-foreground/20">
                  <FileCode className="h-6 w-6" />
                </div>
                <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest leading-relaxed">
                  No files in workspace.<br/>Click the plus icon to start.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 h-8 text-[10px] uppercase font-bold tracking-widest border-white/10 hover:bg-white/5"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus className="h-3 w-3 mr-2" /> Add File
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
