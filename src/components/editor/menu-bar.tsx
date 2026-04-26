
"use client"

import { useRef } from 'react'
import { Command, Play, Github, FileUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useEditorStore } from '@/hooks/use-editor-store'
import { useToast } from '@/hooks/use-toast'

interface MenuBarProps {
  onNewFile: () => void
}

export function MenuBar({ onNewFile }: MenuBarProps) {
  const store = useEditorStore()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOpenFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const id = store.createNode(file.name, 'file', null, content)
      store.selectFile(id)
      toast({
        title: "File Opened",
        description: `Successfully loaded ${file.name}`,
      })
    }
    reader.readAsText(file)
    
    // Reset input so the same file can be opened again if needed
    e.target.value = ''
  }

  return (
    <header className="h-10 border-b flex items-center justify-between px-4 bg-[#0A0A0A] z-50">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-[10px] shadow-[0_0_10px_rgba(124,58,237,0.3)]">C</div>
          <span className="font-bold text-xs tracking-widest">CARET</span>
        </div>
        
        <Menubar className="border-none bg-transparent shadow-none h-auto p-0 gap-1">
          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-medium px-2 hover:bg-white/5 cursor-pointer">File</MenubarTrigger>
            <MenubarContent className="bg-[#111] border-white/5">
              <MenubarItem onClick={onNewFile}>New File <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={handleOpenFileClick}>Open File <MenubarShortcut>Ctrl+O</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem disabled={!store.activeFileId}>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
              <MenubarItem disabled={!store.activeFileId}>Save As...</MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => store.activeFileId && store.closeTab(store.activeFileId)} disabled={!store.activeFileId}>Close File</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-medium px-2 hover:bg-white/5 cursor-pointer">Edit</MenubarTrigger>
            <MenubarContent className="bg-[#111] border-white/5">
              <MenubarItem>Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
              <MenubarItem>Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => {
                if (store.activeFileId) {
                  const name = window.prompt("New name:", store.activeFile?.name)
                  if (name) store.renameNode(store.activeFileId, name)
                }
              }} disabled={!store.activeFileId}>Rename</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-medium px-2 hover:bg-white/5 cursor-pointer">View</MenubarTrigger>
            <MenubarContent className="bg-[#111] border-white/5">
              <MenubarItem onClick={() => store.setIsSidebarOpen(!store.ui.isSidebarOpen)}>
                {store.ui.isSidebarOpen ? "Hide Explorer" : "Show Explorer"}
              </MenubarItem>
              <MenubarItem onClick={() => store.setIsTerminalOpen(!store.ui.isTerminalOpen)}>
                {store.ui.isTerminalOpen ? "Hide Terminal" : "Show Terminal"}
              </MenubarItem>
              <MenubarItem onClick={() => store.setIsAIPanelOpen(!store.ui.isAIPanelOpen)}>
                {store.ui.isAIPanelOpen ? "Hide AI Assistant" : "Show AI Assistant"}
              </MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => store.setIsSettingsOpen(true)}>Settings</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-medium px-2 hover:bg-white/5 cursor-pointer">Terminal</MenubarTrigger>
            <MenubarContent className="bg-[#111] border-white/5">
              <MenubarItem onClick={() => store.setIsTerminalOpen(true)}>Open Terminal</MenubarItem>
              <MenubarItem onClick={() => store.executeCommand('clear')}>Clear Terminal</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-medium px-2 hover:bg-white/5 cursor-pointer">Help</MenubarTrigger>
            <MenubarContent className="bg-[#111] border-white/5">
              <MenubarItem onClick={() => alert("CARET AI Editor v1.0\nProfessional Workspace.")}>About Caret</MenubarItem>
              <MenubarItem>Shortcuts</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="h-7 bg-muted/10 border border-white/5 rounded-md px-3 flex items-center justify-between text-[11px] text-muted-foreground cursor-pointer hover:bg-white/5 transition-all">
          <span className="truncate">{store.activeFile?.name || 'Search files or commands'}</span>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>P</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-green-500" title="Run">
          <Play className="h-3.5 w-3.5" />
        </Button>
        <div className="w-[1px] h-3 bg-white/10" />
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Github className="h-3.5 w-3.5" />
        </Button>
      </div>
    </header>
  )
}
