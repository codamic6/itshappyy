
"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronDown, ChevronRight, Trash2, FilePlus, FolderPlus, Search, MoreVertical, Edit2, Folder, FolderOpen, GitBranch, Blocks, History, Package, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEditorStore } from "@/hooks/use-editor-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { FileIcon } from "./file-icon"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query } from "firebase/firestore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ExtensionSidebar } from "./extension-sidebar"

export function EditorSidebar() {
  const store = useEditorStore()
  const activeView = store.ui.activeView

  return (
    <div className="w-full flex flex-col h-full bg-[#050505] select-none border-r border-white/5">
      {activeView === 'explorer' && <ExplorerView />}
      {activeView === 'search' && <SearchView />}
      {activeView === 'git' && <SourceControlView />}
      {activeView === 'extensions' && <ExtensionSidebar />}
      {activeView === 'ai' && <AILogicView />}
    </div>
  )
}

function ExplorerView() {
  const store = useEditorStore()
  const [newName, setNewName] = useState("")
  const [isCreating, setIsCreating] = useState<{ type: 'file' | 'folder', parentId: string | null } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isWorkspaceCollapsed, setIsWorkspaceCollapsed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const creationProcessed = useRef(false)

  const rootNodes = Object.values(store.nodes || {})
    .filter((n: any) => !n.parentId)
    .filter((n: any) => n.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a: any, b: any) => {
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
      creationProcessed.current = true
      const id = store.createNode(trimmed, isCreating.type, isCreating.parentId)
      if (isCreating.type === 'file') store.selectFile(id)
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

  const startCreation = (type: 'file' | 'folder', parentId: string | null = null) => {
    if (parentId && !store.expandedFolders[parentId]) {
      store.toggleFolder(parentId)
    }
    setIsCreating({ type, parentId })
  }

  return (
    <>
      <div className="p-3 h-12 flex items-center justify-between border-b border-white/5 bg-black/40">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">Explorer</span>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <ActionIcon 
              icon={<FilePlus className="h-3.5 w-3.5" />} 
              onClick={(e: any) => {
                e.stopPropagation();
                const parentId = store.selectedNodeId && store.nodes[store.selectedNodeId]?.type === 'folder' ? store.selectedNodeId : null;
                startCreation('file', parentId);
              }} 
              label="New File" 
            />
            <ActionIcon 
              icon={<FolderPlus className="h-3.5 w-3.5" />} 
              onClick={(e: any) => {
                e.stopPropagation();
                const parentId = store.selectedNodeId && store.nodes[store.selectedNodeId]?.type === 'folder' ? store.selectedNodeId : null;
                startCreation('folder', parentId);
              }} 
              label="New Folder" 
            />
          </TooltipProvider>
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="relative group">
          <Search className="absolute left-2.5 top-2 h-3 w-3 text-muted-foreground/30" />
          <input 
            type="text"
            placeholder="Search..."
            className="w-full bg-white/[0.03] border border-white/5 rounded py-1.5 pl-8 pr-2 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-white/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          <div 
            className="flex items-center gap-1 px-4 py-1.5 text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-1 cursor-pointer hover:text-white transition-colors"
            onClick={() => setIsWorkspaceCollapsed(!isWorkspaceCollapsed)}
          >
            {isWorkspaceCollapsed ? <ChevronRight className="h-2.5 w-2.5" /> : <ChevronDown className="h-2.5 w-2.5" />}
            <span>Workspace</span>
          </div>
          
          <AnimatePresence>
            {!isWorkspaceCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-2 overflow-hidden">
                {isCreating && !isCreating.parentId && (
                  <div className="px-3 py-1.5 flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded mb-1">
                    {isCreating.type === 'file' ? <FileIcon fileName={newName} className="h-3.5 w-3.5 shrink-0" /> : <Folder className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                    <input
                      ref={inputRef}
                      className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-foreground p-0 placeholder:text-muted-foreground/20"
                      placeholder={isCreating.type === 'file' ? "FILE.EXT" : "FOLDER"}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleCreate}
                    />
                  </div>
                )}
                {rootNodes.map((node: any) => (
                  <TreeNode key={node.id} node={node} depth={0} isCreating={isCreating} startCreation={startCreation} newName={newName} setNewName={setNewName} handleKeyDown={handleKeyDown} handleCreate={handleCreate} inputRef={inputRef} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </>
  )
}

function SearchView() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">Search</span>
      <div className="relative group">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground/30" />
        <input autoFocus className="w-full bg-white/[0.03] border border-white/5 rounded py-2 pl-8 pr-2 text-[10px] font-bold tracking-widest focus:outline-none focus:border-white/20" placeholder="SEARCH WORKSPACE..." />
      </div>
    </div>
  )
}

function SourceControlView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-8 opacity-20">
      <GitBranch className="h-12 w-12 mb-4" />
      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-center">Git Not Connected</span>
    </div>
  )
}

function AILogicView() {
  return (
    <div className="p-4 text-center py-20 opacity-20">
      <Zap className="h-10 w-10 mx-auto mb-4 text-white" />
      <span className="text-[9px] font-black uppercase tracking-[0.4em]">Intelligence Active</span>
    </div>
  )
}

function TreeNode({ node, depth, isCreating, startCreation, newName, setNewName, handleKeyDown, handleCreate, inputRef }: any) {
  const store = useEditorStore()
  const isExpanded = store.expandedFolders[node.id]
  const isSelected = store.selectedNodeId === node.id
  const isActive = store.activeFileId === node.id

  const children = Object.values(store.nodes || {})
    .filter((n: any) => n.parentId === node.id)
    .sort((a: any, b: any) => {
      if (a.type === b.type) return a.name.localeCompare(b.name)
      return a.type === 'folder' ? -1 : 1
    })

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "group flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold cursor-pointer transition-all rounded relative border border-transparent",
          isSelected ? "bg-white/[0.05] border-white/5 text-white" : "text-muted-foreground/60 hover:text-white hover:bg-white/[0.02]",
          isActive && "text-white"
        )}
        style={{ paddingLeft: `${(depth * 12) + 12}px` }}
        onClick={() => store.selectFile(node.id)}
      >
        {node.type === 'folder' && (isExpanded ? <ChevronDown className="h-2.5 w-2.5 shrink-0 opacity-40" /> : <ChevronRight className="h-2.5 w-2.5 shrink-0 opacity-40" />)}
        {node.type === 'file' ? <FileIcon fileName={node.name} className="h-3 w-3 shrink-0" /> : (isExpanded ? <FolderOpen className="h-3 w-3 shrink-0 opacity-60" /> : <Folder className="h-3 w-3 shrink-0 opacity-60" />)}
        <span className="truncate flex-1 tracking-tight">{node.name.toUpperCase()}</span>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className="p-1 hover:text-white" onClick={(e) => e.stopPropagation()}><MoreVertical className="h-2.5 w-2.5" /></button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border-white/10">
              {node.type === 'folder' && (
                <><DropdownMenuItem onClick={() => startCreation('file', node.id)} className="text-[10px] font-bold gap-2">NEW FILE</DropdownMenuItem>
                <DropdownMenuItem onClick={() => startCreation('folder', node.id)} className="text-[10px] font-bold gap-2">NEW FOLDER</DropdownMenuItem></>
              )}
              <DropdownMenuItem onClick={() => store.deleteNode(node.id)} className="text-[10px] font-bold gap-2 text-white/40">DELETE</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {node.type === 'folder' && isExpanded && (
        <div className="flex flex-col">
          <AnimatePresence>
            {isCreating && isCreating.parentId === node.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="py-1.5 flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded mb-1 overflow-hidden" style={{ marginLeft: `${(depth + 1) * 12 + 12}px`, marginRight: '8px' }}>
                <input ref={inputRef} className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-foreground p-0" placeholder="..." value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleCreate} />
              </motion.div>
            )}
          </AnimatePresence>
          {children.map((child: any) => <TreeNode key={child.id} node={child} depth={depth + 1} isCreating={isCreating} startCreation={startCreation} newName={newName} setNewName={setNewName} handleKeyDown={handleKeyDown} handleCreate={handleCreate} inputRef={inputRef} />)}
        </div>
      )}
    </div>
  )
}

function ActionIcon({ icon, onClick, label }: any) {
  return (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white" onClick={onClick}>{icon}</Button></TooltipTrigger>
      <TooltipContent side="bottom" className="text-[9px] font-bold bg-black border-white/10 uppercase tracking-widest">{label}</TooltipContent>
    </Tooltip>
  )
}
