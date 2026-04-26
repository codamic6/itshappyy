
"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronDown, Trash2, FilePlus, FolderPlus, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEditorStore } from "@/hooks/use-editor-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { FileIcon } from "./file-icon"

export function EditorSidebar() {
  const store = useEditorStore()
  const [newFileName, setNewFileName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const files = Object.values(store.files || {}).filter((f: any) => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isCreating])

  const handleCreate = () => {
    const trimmed = newFileName.trim()
    if (trimmed) {
      const id = store.createFile(trimmed)
      store.selectFile(id)
    }
    setIsCreating(false)
    setNewFileName("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCreate()
    }
    if (e.key === 'Escape') {
      setIsCreating(false)
      setNewFileName("")
    }
  }

  return (
    <div className="w-full flex flex-col h-full bg-[#0D1117] select-none border-r border-white/5">
      <div className="p-3 h-12 flex items-center justify-between border-b border-white/5 bg-black/20">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Explorer</span>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <ActionIcon icon={<FilePlus className="h-4 w-4" />} onClick={() => setIsCreating(true)} label="New File" />
            <ActionIcon icon={<FolderPlus className="h-4 w-4" />} label="New Folder" />
          </TooltipProvider>
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="relative group">
          <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            placeholder="Search files..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-md py-1.5 pl-8 pr-2 text-[11px] focus:outline-none focus:border-primary/30 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          <div className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
            <ChevronDown className="h-3 w-3" />
            <span>Workspace</span>
          </div>
          
          <div className="space-y-0.5 px-2">
            <AnimatePresence>
              {isCreating && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-2 py-1.5 flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-md mb-1 overflow-hidden"
                >
                  <FileIcon fileName={newFileName} className="h-4 w-4 shrink-0" />
                  <input
                    ref={inputRef}
                    className="flex-1 bg-transparent border-none outline-none text-xs text-foreground p-0 placeholder:text-muted-foreground/40"
                    placeholder="filename.ext"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                      if (!newFileName.trim()) {
                        setIsCreating(false)
                      } else {
                        handleCreate()
                      }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {files.length > 0 ? (
              files.map((file: any) => (
                <div
                  key={file.id}
                  className={cn(
                    "group flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer transition-all rounded-md relative",
                    store.activeFileId === file.id 
                      ? "bg-primary/20 text-primary font-bold" 
                      : "text-muted-foreground hover:bg-white/5"
                  )}
                  onClick={() => store.selectFile(file.id)}
                >
                  <FileIcon fileName={file.name} className="h-4 w-4 shrink-0" />
                  <span className="truncate flex-1">{file.name}</span>
                  <button 
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      store.deleteFile(file.id)
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            ) : !isCreating && (
              <div className="px-4 py-8 flex flex-col items-center justify-center text-center opacity-40">
                <FileIcon fileName="unknown" className="h-8 w-8 mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Workspace is empty</p>
                <Button variant="ghost" className="mt-4 text-[10px] uppercase font-bold text-primary" onClick={() => setIsCreating(true)}>
                  Create File
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

function ActionIcon({ icon, onClick, label }: any) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/5 hover:text-primary" onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-[10px] bg-black border-white/10">{label}</TooltipContent>
    </Tooltip>
  )
}
