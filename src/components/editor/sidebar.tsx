
"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronDown, Trash2, FilePlus, FolderPlus, Search, MoreVertical, Edit2, Folder } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEditorStore } from "@/hooks/use-editor-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { FileIcon } from "./file-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function EditorSidebar() {
  const store = useEditorStore()
  const [newName, setNewName] = useState("")
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const creationProcessed = useRef(false)

  const nodes = Object.values(store.nodes || {}).filter((f: any) => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a: any, b: any) => {
    if (a.type === b.type) return a.name.localeCompare(b.name)
    return a.type === 'folder' ? -1 : 1
  })

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus()
      creationProcessed.current = false
    }
  }, [isCreating])

  const handleCreate = () => {
    if (creationProcessed.current) return
    const trimmed = newName.trim()
    if (trimmed && isCreating) {
      const id = store.createNode(trimmed, isCreating)
      if (isCreating === 'file') store.selectFile(id)
      creationProcessed.current = true
    }
    setIsCreating(null)
    setNewName("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCreate()
    }
    if (e.key === 'Escape') {
      setIsCreating(null)
      setNewName("")
    }
  }

  const handleRename = (id: string, currentName: string) => {
    const name = window.prompt("Rename to:", currentName)
    if (name && name.trim()) {
      store.renameNode(id, name.trim())
    }
  }

  return (
    <div className="w-full flex flex-col h-full bg-[#0D1117] select-none border-r border-white/5">
      <div className="p-3 h-12 flex items-center justify-between border-b border-white/5 bg-black/20">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Explorer</span>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <ActionIcon icon={<FilePlus className="h-4 w-4" />} onClick={() => setIsCreating('file')} label="New File" />
            <ActionIcon icon={<FolderPlus className="h-4 w-4" />} onClick={() => setIsCreating('folder')} label="New Folder" />
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
                  {isCreating === 'file' ? <FileIcon fileName={newName} className="h-4 w-4 shrink-0" /> : <Folder className="h-4 w-4 shrink-0 text-primary" />}
                  <input
                    ref={inputRef}
                    className="flex-1 bg-transparent border-none outline-none text-xs text-foreground p-0 placeholder:text-muted-foreground/40"
                    placeholder={isCreating === 'file' ? "file.ext" : "folder name"}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleCreate}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {nodes.length > 0 ? (
              nodes.map((node: any) => (
                <div
                  key={node.id}
                  className={cn(
                    "group flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer transition-all rounded-md relative",
                    store.activeFileId === node.id 
                      ? "bg-primary/20 text-primary font-bold" 
                      : "text-muted-foreground hover:bg-white/5"
                  )}
                  onClick={() => store.selectFile(node.id)}
                >
                  {node.type === 'file' ? <FileIcon fileName={node.name} className="h-4 w-4 shrink-0" /> : <Folder className="h-4 w-4 shrink-0 text-primary/70" />}
                  <span className="truncate flex-1">{node.name}</span>
                  
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="h-3 w-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#111] border-white/10">
                        <DropdownMenuItem onClick={() => handleRename(node.id, node.name)} className="text-xs gap-2">
                          <Edit2 className="h-3 w-3" /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => store.deleteNode(node.id)} className="text-xs gap-2 text-destructive focus:text-destructive">
                          <Trash2 className="h-3 w-3" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : !isCreating && (
              <div className="px-4 py-8 flex flex-col items-center justify-center text-center opacity-40">
                <FileIcon fileName="unknown" className="h-8 w-8 mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Workspace is empty</p>
                <Button variant="ghost" className="mt-4 text-[10px] uppercase font-bold text-primary" onClick={() => setIsCreating('file')}>
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
