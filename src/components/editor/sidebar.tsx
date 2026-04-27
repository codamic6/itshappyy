
"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronDown, ChevronRight, Trash2, FilePlus, FolderPlus, Search, MoreVertical, Edit2, Folder, FolderOpen, GitBranch, Blocks, History, Package } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

export function EditorSidebar() {
  const store = useEditorStore()
  const activeView = store.ui.activeView

  return (
    <div className="w-full flex flex-col h-full bg-[#0D1117] select-none border-r border-white/5">
      {activeView === 'explorer' && <ExplorerView />}
      {activeView === 'search' && <SearchView />}
      {activeView === 'git' && <SourceControlView />}
      {activeView === 'extensions' && <ExtensionsView />}
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
      <div className="p-3 h-12 flex items-center justify-between border-b border-white/5 bg-black/20">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Explorer</span>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <ActionIcon 
              icon={<FilePlus className="h-4 w-4" />} 
              onClick={(e: any) => {
                e.stopPropagation();
                const parentId = store.selectedNodeId && store.nodes[store.selectedNodeId]?.type === 'folder' ? store.selectedNodeId : null;
                startCreation('file', parentId);
              }} 
              label="New File" 
            />
            <ActionIcon 
              icon={<FolderPlus className="h-4 w-4" />} 
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
          <div 
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setIsWorkspaceCollapsed(!isWorkspaceCollapsed)}
          >
            {isWorkspaceCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            <span>Workspace</span>
          </div>
          
          <AnimatePresence>
            {!isWorkspaceCollapsed && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-2 overflow-hidden"
              >
                {isCreating && !isCreating.parentId && (
                  <div className="px-2 py-1.5 flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-md mb-1">
                    {isCreating.type === 'file' ? <FileIcon fileName={newName} className="h-4 w-4 shrink-0" /> : <Folder className="h-4 w-4 shrink-0 text-primary" />}
                    <input
                      ref={inputRef}
                      className="flex-1 bg-transparent border-none outline-none text-xs text-foreground p-0 placeholder:text-muted-foreground/40"
                      placeholder={isCreating.type === 'file' ? "file.ext" : "folder name"}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleCreate}
                    />
                  </div>
                )}

                {rootNodes.map((node: any) => (
                  <TreeNode 
                    key={node.id} 
                    node={node} 
                    depth={0} 
                    isCreating={isCreating} 
                    startCreation={startCreation}
                    newName={newName}
                    setNewName={setNewName}
                    handleKeyDown={handleKeyDown}
                    handleCreate={handleCreate}
                    inputRef={inputRef}
                  />
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
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Global Search</span>
      <div className="relative group">
        <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground/40" />
        <input 
          autoFocus
          className="w-full bg-white/[0.03] border border-white/5 rounded-md py-2 pl-8 pr-2 text-xs focus:outline-none focus:border-primary/30"
          placeholder="Search in files..."
        />
      </div>
      <div className="text-[10px] text-muted-foreground opacity-40 text-center py-20">
        No results found. Start typing to search.
      </div>
    </div>
  )
}

function SourceControlView() {
  const store = useEditorStore()
  const modifiedFiles = Object.values(store.files).filter((f: any) => f.updatedAt > Date.now() - 600000)

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 h-12 flex items-center justify-between border-b border-white/5 bg-black/20">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Source Control</span>
        <TooltipProvider>
          <ActionIcon icon={<History className="h-4 w-4" />} label="View History" />
        </TooltipProvider>
      </div>
      <div className="p-4 space-y-4">
        <div className="relative">
          <textarea 
            className="w-full bg-white/[0.03] border border-white/5 rounded-md p-2 text-xs min-h-[80px] focus:outline-none focus:border-primary/30"
            placeholder="Message (Ctrl+Enter to commit)"
          />
          <Button className="w-full mt-2 bg-primary h-8 text-[11px] font-bold uppercase tracking-widest">Commit</Button>
        </div>
        
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Changes</span>
          {modifiedFiles.length > 0 ? (
            modifiedFiles.map((f: any) => (
              <div key={f.id} className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5 rounded-md group cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileIcon fileName={f.name} className="h-3.5 w-3.5" />
                  <span className="text-xs text-muted-foreground">{f.name}</span>
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[9px]">M</Badge>
              </div>
            ))
          ) : (
            <div className="text-[10px] text-muted-foreground opacity-40 text-center py-10">No staged changes</div>
          )}
        </div>
      </div>
    </div>
  )
}

function ExtensionsView() {
  const extensions = [
    { name: "Caret Python AI", desc: "Advanced Python logic", author: "Caret Team", installed: true },
    { name: "Tailwind IntelliSense", desc: "Auto-completion for Tailwind", author: "Tailwind Labs", installed: true },
    { name: "GitLens Lite", desc: "Visualize code authorship", author: "GitKraken", installed: false },
    { name: "Prettier", desc: "Opinionated code formatter", author: "Prettier", installed: true },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 h-12 flex items-center justify-between border-b border-white/5 bg-black/20">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Extensions</span>
      </div>
      <div className="p-4 space-y-4">
        <input 
          className="w-full bg-white/[0.03] border border-white/5 rounded-md py-1.5 px-3 text-[11px] focus:outline-none focus:border-primary/30"
          placeholder="Search extensions..."
        />
        <div className="space-y-3">
          {extensions.map((ext, i) => (
            <div key={i} className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Package className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-foreground truncate">{ext.name}</h4>
                  <p className="text-[10px] text-muted-foreground truncate">{ext.author}</p>
                </div>
                {!ext.installed && <Button size="sm" variant="ghost" className="h-6 text-[9px] uppercase font-bold text-primary">Install</Button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AILogicView() {
  return (
    <div className="p-4 text-center py-20 opacity-40">
      <Blocks className="h-10 w-10 mx-auto mb-4 text-primary" />
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Intelligence Active</span>
      <p className="text-[11px] mt-2">Open the right panel for full AI assistant features.</p>
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
          "group flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer transition-all rounded-md relative",
          isSelected ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-white/5",
          isActive && "font-bold"
        )}
        style={{ paddingLeft: `${(depth * 12) + 8}px` }}
        onClick={() => store.selectFile(node.id)}
      >
        {node.type === 'folder' && (
          isExpanded ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />
        )}
        {node.type === 'file' ? (
          <FileIcon fileName={node.name} className="h-4 w-4 shrink-0" />
        ) : (
          isExpanded ? <FolderOpen className="h-4 w-4 shrink-0 text-primary/70" /> : <Folder className="h-4 w-4 shrink-0 text-primary/70" />
        )}
        <span className="truncate flex-1">{node.name}</span>
        
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#111] border-white/10">
              {node.type === 'folder' && (
                <>
                  <DropdownMenuItem onClick={() => startCreation('file', node.id)} className="text-xs gap-2">
                    <FilePlus className="h-3 w-3" /> New File
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => startCreation('folder', node.id)} className="text-xs gap-2">
                    <FolderPlus className="h-3 w-3" /> New Folder
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem onClick={() => {
                const name = window.prompt("Rename to:", node.name)
                if (name) store.renameNode(node.id, name)
              }} className="text-xs gap-2">
                <Edit2 className="h-3 w-3" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => store.deleteNode(node.id)} className="text-xs gap-2 text-destructive focus:text-destructive">
                <Trash2 className="h-3 w-3" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {node.type === 'folder' && isExpanded && (
        <div className="flex flex-col">
          <AnimatePresence>
            {isCreating && isCreating.parentId === node.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="py-1.5 flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-md mb-1 overflow-hidden"
                style={{ marginLeft: `${(depth + 1) * 12 + 8}px`, marginRight: '8px' }}
              >
                {isCreating.type === 'file' ? <FileIcon fileName={newName} className="h-4 w-4 shrink-0" /> : <Folder className="h-4 w-4 shrink-0 text-primary" />}
                <input
                  ref={inputRef}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-foreground p-0 placeholder:text-muted-foreground/40"
                  placeholder={isCreating.type === 'file' ? "file.ext" : "folder name"}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleCreate}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {children.map((child: any) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              depth={depth + 1} 
              isCreating={isCreating} 
              startCreation={startCreation}
              newName={newName}
              setNewName={setNewName}
              handleKeyDown={handleKeyDown}
              handleCreate={handleCreate}
              inputRef={inputRef}
            />
          ))}
        </div>
      )}
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
