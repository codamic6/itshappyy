"use client"

import { useRef, useState } from 'react'
import { Command, Play, Info, Search, Terminal as TerminalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar"
import { useEditorStore } from '@/hooks/use-editor-store'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import Image from 'next/image'

interface MenuBarProps {
  onNewFile: () => void
}

export function MenuBar({ onNewFile }: MenuBarProps) {
  const store = useEditorStore()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <header className="h-9 border-b border-white/5 flex items-center justify-between px-3 bg-[#0C0C0E] z-50">
      <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const r = new FileReader();
        r.onload = (ev) => {
          const id = store.createNode(file.name, 'file', null, ev.target?.result as string);
          store.selectFile(id);
        }
        r.readAsText(file);
      }} />

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 pr-2 border-r border-white/5">
          <Image src="/logo.png" alt="CARET" width={14} height={14} className="opacity-90" />
        </div>
        
        <Menubar className="border-none bg-transparent shadow-none h-auto p-0 gap-0">
          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">File</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem onClick={onNewFile}>New Text File <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => fileInputRef.current?.click()}>Open File... <MenubarShortcut>Ctrl+O</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => toast({ title: "SAVED" })} disabled={!store.activeFileId}>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
              <MenubarItem>Save As...</MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => window.close()}>Exit</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">Edit</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem>Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
              <MenubarItem>Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
              <MenubarItem>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
              <MenubarItem>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">Selection</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem>Select All <MenubarShortcut>Ctrl+A</MenubarShortcut></MenubarItem>
              <MenubarItem>Expand Selection</MenubarItem>
              <MenubarItem>Shrink Selection</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">View</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem onClick={() => store.setIsSidebarOpen(!store.ui.isSidebarOpen)}>Toggle Primary Sidebar <MenubarShortcut>Ctrl+B</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsAIPanelOpen(!store.ui.isAIPanelOpen)}>Toggle Secondary Sidebar</MenubarItem>
              <MenubarItem onClick={() => store.setIsTerminalOpen(!store.ui.isTerminalOpen)}>Toggle Panel <MenubarShortcut>Ctrl+J</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem>Appearance</MenubarItem>
              <MenubarItem>Editor Layout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">Go</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem>Go to File... <MenubarShortcut>Ctrl+P</MenubarShortcut></MenubarItem>
              <MenubarItem>Go to Symbol... <MenubarShortcut>Ctrl+Shift+O</MenubarShortcut></MenubarItem>
              <MenubarItem>Go to Line/Column...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">Run</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem>Start Debugging <MenubarShortcut>F5</MenubarShortcut></MenubarItem>
              <MenubarItem>Run Without Debugging <MenubarShortcut>Ctrl+F5</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">Terminal</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem onClick={() => store.setIsTerminalOpen(true)}>New Terminal <MenubarShortcut>Ctrl+Shift+`</MenubarShortcut></MenubarItem>
              <MenubarItem>Run Build Task... <MenubarShortcut>Ctrl+Shift+B</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[11px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-all">Help</MenubarTrigger>
            <MenubarContent className="bg-[#18181B] border-white/10 text-[12px] p-1 min-w-[200px]">
              <MenubarItem onClick={() => setIsAboutOpen(true)}>About CARET</MenubarItem>
              <MenubarItem>Documentation</MenubarItem>
              <MenubarItem>Keyboard Shortcuts</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex-1 max-w-[400px] mx-4">
        <div 
          className="h-6 bg-white/[0.03] border border-white/5 rounded px-3 flex items-center justify-between text-[11px] font-future text-white/30 cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => store.setIsCommandPaletteOpen(true)}
        >
          <span className="truncate">{store.activeFile?.name || 'Search commands...'}</span>
          <div className="flex items-center gap-1 opacity-40">
            <Command className="h-3 w-3" />
            <span>P</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/30 hover:text-white" onClick={() => toast({ title: "INITIATING BUILD..." })}>
          <Play className="h-3.5 w-3.5 fill-current" />
        </Button>
      </div>

      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="bg-[#0C0C0E] border-white/10 text-white crystal-panel max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-future flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={20} height={20} />
              CARET IDE
            </DialogTitle>
            <DialogDescription className="text-white/50 text-sm font-future pt-4 leading-relaxed">
              Advanced Professional Workstation<br />
              Precision-Engineered Coding Environment.<br />
              Version 1.2.5 - Release 2024
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  )
}