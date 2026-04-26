
"use client"

import { FileCode, Plus, FolderOpen, Settings, Zap, BookOpen, Search, Menu } from "lucide-react"
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
    <div className="w-64 border-r bg-card flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 font-headline font-bold text-primary">
          <Zap className="h-5 w-5 fill-primary" />
          <span>DevSphere AI</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-2 flex items-center gap-1 border-b bg-muted/30">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onNewFile}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <FolderOpen className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <div className="px-2 py-1 text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
            Explorer
          </div>
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => onFileSelect(file.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm transition-colors text-left",
                activeFileId === file.id 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <FileCode className={cn("h-4 w-4", activeFileId === file.id ? "text-primary" : "text-muted-foreground")} />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-2 border-t mt-auto flex flex-col gap-1">
        <Button variant="ghost" className="justify-start gap-2 h-9 text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm">Documentation</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-2 h-9 text-muted-foreground">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </Button>
      </div>
    </div>
  )
}
