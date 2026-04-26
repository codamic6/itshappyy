
"use client"

import { useState, useRef, useEffect } from "react"
import { FileCode, Plus, Search, GitBranch, Zap, ChevronDown, Trash2, FolderPlus, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEditorStore } from "@/hooks/use-editor-store"

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
    if (isCreating && inputRef.current) inputRef.current.focus()
  }, [isCreating])

  const handleCreate = () => {
    if (newFileName.trim()) {
      store.createFile(newFileName)
    }
    setNewFileName("")
    setIsCreating(false)
  }

  return (
    <div className="w-[250px] flex flex-col h-full bg-[#0D1117] border-r border-white/5 select-none animate-in slide-in-from-left duration-300">
      <div className="p-3 h-12 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Explorer</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsCreating(true)}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <FolderPlus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          <div className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
            <ChevronDown className="h-3 w-3" />
            <span>Workspace</span>
          </div>
          
          <div className="mt-1 space-y-0.5">
            {isCreating && (
              <div className="px-4 py-1.5 flex items-center gap-2 bg-primary/10 border-y border-primary/20">
                <FileCode className="h-4 w-4 text-primary" />
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-foreground p-0"
                  placeholder="index.js"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  onBlur={() => !newFileName && setIsCreating(false)}
                />
              </div>
            )}

            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "group flex items-center gap-2 px-4 py-1.5 text-xs cursor-pointer transition-all border-l-2",
                  store.activeFileId === file.id 
                    ? "bg-white/5 text-primary border-primary" 
                    : "text-muted-foreground hover:bg-white/5 border-transparent"
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
            ))}
            
            {files.length === 0 && !isCreating && (
              <div className="px-6 py-8 text-center border border-dashed border-white/5 rounded-lg mx-3 mt-4">
                <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest leading-relaxed">No files created.<br/>Use the + icon above.</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
