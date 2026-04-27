
"use client"

import { useRef, useState } from 'react'
import { Command, Play, Github, Info, Keyboard } from 'lucide-react'
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface MenuBarProps {
  onNewFile: () => void
}

export function MenuBar({ onNewFile }: MenuBarProps) {
  const store = useEditorStore()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

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
    e.target.value = ''
  }

  return (
    <header className="h-10 border-b flex items-center justify-between px-4 bg-[#0A0A0A] z-50">
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
              <MenubarItem onClick={() => toast({ title: "Saved", description: store.activeFile?.name || "Workspace saved" })} disabled={!store.activeFileId}>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
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
                {store.ui.isSidebarOpen ? "Hide Explorer" : "Show Explorer"} <MenubarShortcut>Ctrl+B</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => store.setIsTerminalOpen(!store.ui.isTerminalOpen)}>
                {store.ui.isTerminalOpen ? "Hide Terminal" : "Show Terminal"} <MenubarShortcut>Ctrl+J</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => store.setIsAIPanelOpen(!store.ui.isAIPanelOpen)}>
                {store.ui.isAIPanelOpen ? "Hide AI Assistant" : "Show AI Assistant"} <MenubarShortcut>Ctrl+I</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => store.setIsSettingsOpen(true)}>Settings</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-medium px-2 hover:bg-white/5 cursor-pointer">Help</MenubarTrigger>
            <MenubarContent className="bg-[#111] border-white/5">
              <MenubarItem onClick={() => setIsAboutOpen(true)}><Info className="h-3 w-3 mr-2" /> About Caret</MenubarItem>
              <MenubarItem onClick={() => store.setIsShortcutsOpen(true)}><Keyboard className="h-3 w-3 mr-2" /> Shortcuts <MenubarShortcut>Ctrl+D</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div 
          className="h-7 bg-muted/10 border border-white/5 rounded-md px-3 flex items-center justify-between text-[11px] text-muted-foreground cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => store.setIsCommandPaletteOpen(true)}
        >
          <span className="truncate">{store.activeFile?.name || 'Search files or commands'}</span>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>P</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-green-500" title="Run" onClick={() => toast({ title: "Build Started", description: "Preparing execution environment..." })}>
          <Play className="h-3.5 w-3.5" />
        </Button>
        <div className="w-[1px] h-3 bg-white/10" />
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => window.open('https://github', '_blank')}>
          <Github className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* About Dialog */}
      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="bg-[#111] border-white/5 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-[12px] font-bold">C</div>
              CARET Editor
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              Version 1.0.0 (Pro Edition)<br />
              Powered by Google Gemini & Genkit.<br /><br />
              Experience high-performance code editing with integrated AI intelligence.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Shortcuts Dialog */}
      <Dialog open={store.ui.isShortcutsOpen} onOpenChange={store.setIsShortcutsOpen}>
        <DialogContent className="bg-[#111] border-white/5 text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[14px] font-bold uppercase tracking-widest text-primary">Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <ShortcutRow label="Toggle Sidebar" shortcut="Ctrl + B" />
            <ShortcutRow label="Toggle AI Panel" shortcut="Ctrl + I" />
            <ShortcutRow label="Toggle Terminal" shortcut="Ctrl + J" />
            <ShortcutRow label="Command Palette" shortcut="Ctrl + K / Ctrl + P" />
            <ShortcutRow label="New File" shortcut="Ctrl + N" />
            <ShortcutRow label="Shortcuts List" shortcut="Ctrl + D" />
            <ShortcutRow label="Save File" shortcut="Ctrl + S" />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

function ShortcutRow({ label, shortcut }: { label: string, shortcut: string }) {
  return (
    <div className="flex items-center justify-between text-[11px] border-b border-white/5 pb-2">
      <span className="text-muted-foreground">{label}</span>
      <kbd className="bg-white/5 px-2 py-0.5 rounded border border-white/10 font-mono text-primary">{shortcut}</kbd>
    </div>
  )
}
