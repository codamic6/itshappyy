"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronDown, ChevronRight, FilePlus, FolderPlus, Search, MoreVertical, Folder, FolderOpen, GitBranch, Blocks, Zap } from "lucide-react"
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
import { ExtensionSidebar } from "./extension-sidebar"

export function EditorSidebar() {
  const store = useEditorStore()
  const activeView = store.ui.activeView

  return (
    <div className="w-full flex flex-col h-full bg-[#0C0C0E] select-none border-r border-white/5 crystal-panel">
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
    if (e.key === 'Enter') { e.preventDefault(); handleCreate(); }
    if (e.key === 'Escape') { setIsCreating(null); setNewName(""); }
  }

  const startCreation = (type: 'file' | 'folder', parentId: string | null = null) => {
    if (parentId && !store.expandedFolders[parentId]) store.toggleFolder(parentId)
    setIsCreating({ type, parentId })
  }

  return (
    <>
      <div className="p-4 h-12 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
        <span className="text-[9px] font-future text-white/40">EXPLORER</span>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <ActionIcon icon={<FilePlus className="h-3 w-3" />} onClick={(e: any) => { e.stopPropagation(); startCreation('file'); }} label="New File" />
            <ActionIcon icon={<FolderPlus className="h-3 w-3" />} onClick={(e: any) => { e.stopPropagation(); startCreation('folder'); }} label="New Folder" />
          </TooltipProvider>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="relative group">
          <Search className="absolute left-3 top-2 h-3 w-3 text-white/10" />
          <input 
            type="text"
            placeholder="FILTER..."
            className="w-full bg-white/[0.02] border border-white/5 rounded px-2 py-1.5 pl-9 text-[9px] font-future focus:outline-none focus:border-white/20 transition-all placeholder:text-white/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          <div 
            className="flex items-center gap-2 px-5 py-2 text-[8px] font-future text-white/20 hover:text-white/40 cursor-pointer transition-colors"
            onClick={() => setIsWorkspaceCollapsed(!isWorkspaceCollapsed)}
          >
            {isWorkspaceCollapsed ? <ChevronRight className="h-2 w-2" /> : <ChevronDown className="h-2 w-2" />}
            <span>WORKSPACE CORE</span>
          </div>
          
          <AnimatePresence>
            {!isWorkspaceCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-2 overflow-hidden">
                {isCreating && !isCreating.parentId && (
                  <div className="px-4 py-2 flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-sm mb-1">
                    {isCreating.type === 'file' ? <FileIcon fileName={newName} className="h-3 w-3" /> : <Folder className="h-3 w-3 text-white/20" />}
                    <input
                      ref={inputRef}
                      className="flex-1 bg-transparent border-none outline-none text-[10px] font-future p-0"
                      placeholder="..."
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
          "group flex items-center gap-3 px-4 py-2 text-[10px] font-future cursor-pointer transition-all rounded-sm border border-transparent mb-[1px]",
          isSelected ? "bg-white/[0.05] text-white shining-border" : "text-white/30 hover:text-white/60 hover:bg-white/[0.01]",
          isActive && "text-white bg-white/[0.02]"
        )}
        style={{ paddingLeft: `${(depth * 14) + 16}px` }}
        onClick={() => store.selectFile(node.id)}
      >
        {node.type === 'folder' && (isExpanded ? <ChevronDown className="h-2.5 w-2.5 opacity-20" /> : <ChevronRight className="h-2.5 w-2.5 opacity-20" />)}
        {node.type === 'file' ? <FileIcon fileName={node.name} className="h-3 w-3" /> : (isExpanded ? <FolderOpen className="h-3 w-3 opacity-40" /> : <Folder className="h-3 w-3 opacity-40" />)}
        <span className="truncate flex-1">{node.name.toUpperCase()}</span>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><button className="p-1 hover:text-white" onClick={(e) => e.stopPropagation()}><MoreVertical className="h-2.5 w-2.5" /></button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0C0C0E] border-white/10 text-[9px] font-future uppercase p-1">
              {node.type === 'folder' && (
                <><DropdownMenuItem onClick={() => startCreation('file', node.id)} className="gap-2">NEW DATA</DropdownMenuItem>
                <DropdownMenuItem onClick={() => startCreation('folder', node.id)} className="gap-2">NEW NODE</DropdownMenuItem></>
              )}
              <DropdownMenuItem onClick={() => store.deleteNode(node.id)} className="gap-2 text-red-500/60">PURGE</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {node.type === 'folder' && isExpanded && (
        <div className="flex flex-col">
          <AnimatePresence>
            {isCreating && isCreating.parentId === node.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="py-2 flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-sm mb-1 overflow-hidden" style={{ marginLeft: `${(depth + 1) * 14 + 16}px`, marginRight: '16px' }}>
                <input ref={inputRef} className="flex-1 bg-transparent border-none outline-none text-[10px] font-future p-0" placeholder="..." value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleCreate} />
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
      <TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6 text-white/20 hover:text-white" onClick={onClick}>{icon}</Button></TooltipTrigger>
      <TooltipContent side="bottom" className="text-[8px] font-future bg-[#111] border-white/10 p-2 uppercase tracking-widest">{label}</TooltipContent>
    </Tooltip>
  )
}

function SearchView() { return <div className="p-6 text-[9px] font-future text-white/20">SEARCHING...</div> }
function SourceControlView() { return <div className="p-6 text-[9px] font-future text-white/20">GIT SYNC: OFFLINE</div> }
function AILogicView() { return <div className="p-6 text-[9px] font-future text-white/20">INTELLIGENCE ACTIVE</div> }