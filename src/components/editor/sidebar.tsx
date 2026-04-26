
"use client"

import { FileCode, Plus, FolderOpen, Settings, Zap, BookOpen, Search, Menu, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FileItem } from "@/hooks/use-editor-store"

interface SidebarProps {
  files: FileItem[]
  activeFileId: string
  onFileSelect: (id: string) => void
  onNewFile: () => void
}

export function EditorSidebar({ files, activeFileId, onFileSelect, onNewFile }: SidebarProps) {
  return (
    <div className="w-64 border-r bg-[#0c0c0e] flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 font-headline font-bold text-primary">
          <Zap className="h-5 w-5 fill-primary" />
          <span className="tracking-tighter text-lg">CARET</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-2 flex items-center gap-1 border-b bg-muted/5">
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/5" onClick={onNewFile} title="New File">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/5" title="Open Folder">
          <FolderOpen className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/5" title="Search">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          <div className="flex items-center gap-1 px-3 py-1 text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1 group cursor-pointer">
            <ChevronDown className="h-3 w-3" />
            <span>Explorer</span>
          </div>
          
          <div className="px-2">
            <div className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-muted-foreground group cursor-pointer hover:bg-white/5 rounded-sm transition-colors">
              <ChevronDown className="h-3 w-3" />
              <span>PROJECT-WORKSPACE</span>
            </div>
            
            <div className="pl-4 mt-1 space-y-0.5">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => onFileSelect(file.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm transition-colors text-left group relative",
                    activeFileId === file.id 
                      ? "bg-primary/10 text-primary border-l-2 border-primary" 
                      : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <FileCode className={cn("h-4 w-4", activeFileId === file.id ? "text-primary" : "text-muted-foreground/60")} />
                  <span className="truncate text-xs">{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-2 border-t mt-auto flex flex-col gap-1 bg-muted/5">
        <Button variant="ghost" className="justify-start gap-3 h-9 text-muted-foreground hover:bg-white/5 hover:text-foreground">
          <BookOpen className="h-4 w-4" />
          <span className="text-xs">Documentation</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-3 h-9 text-muted-foreground hover:bg-white/5 hover:text-foreground">
          <Settings className="h-4 w-4" />
          <span className="text-xs">Settings</span>
        </Button>
      </div>
    </div>
  )
}
