"use client"

import { useRef, useState, useEffect } from 'react'
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
    <header className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-black z-50">
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

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pr-4 border-r border-white/5">
          <Image src="/logo.png" alt="CARET" width={14} height={14} className="opacity-80" />
          <span className="text-[10px] font-future text-white tracking-[0.2em] font-bold">CARET</span>
        </div>
        
        <Menubar className="border-none bg-transparent shadow-none h-auto p-0 gap-1">
          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[8px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/40 hover:text-white transition-all uppercase">SYSTEM</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10 text-[9px] font-future uppercase p-1">
              <MenubarItem onClick={onNewFile}>NEW FILE <MenubarShortcut>CTRL+N</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => fileInputRef.current?.click()}>IMPORT <MenubarShortcut>CTRL+O</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => toast({ title: "SAVED" })} disabled={!store.activeFileId}>SYNC <MenubarShortcut>CTRL+S</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[8px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/40 hover:text-white transition-all uppercase">EDIT</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10 text-[9px] font-future uppercase p-1">
              <MenubarItem>UNDO <MenubarShortcut>CTRL+Z</MenubarShortcut></MenubarItem>
              <MenubarItem>REDO <MenubarShortcut>CTRL+Y</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem>CUT <MenubarShortcut>CTRL+X</MenubarShortcut></MenubarItem>
              <MenubarItem>COPY <MenubarShortcut>CTRL+C</MenubarShortcut></MenubarItem>
              <MenubarItem>PASTE <MenubarShortcut>CTRL+V</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[8px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/40 hover:text-white transition-all uppercase">VISUALS</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10 text-[9px] font-future uppercase p-1">
              <MenubarItem onClick={() => store.setIsSidebarOpen(!store.ui.isSidebarOpen)}>TOGGLE SIDEBAR <MenubarShortcut>CTRL+B</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsTerminalOpen(!store.ui.isTerminalOpen)}>TOGGLE TERMINAL <MenubarShortcut>CTRL+J</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsAIPanelOpen(!store.ui.isAIPanelOpen)}>TOGGLE AI PANEL <MenubarShortcut>CTRL+I</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsSettingsOpen(true)}>PREFERENCES</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[8px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/40 hover:text-white transition-all uppercase">INTELLIGENCE</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10 text-[9px] font-future uppercase p-1">
              <MenubarItem onClick={() => store.setIsAIPanelOpen(true)}>ASK AI <MenubarShortcut>CTRL+I</MenubarShortcut></MenubarItem>
              <MenubarItem>EXPLAIN CODE</MenubarItem>
              <MenubarItem>FIX ERRORS</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[8px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/40 hover:text-white transition-all uppercase">HELP</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10 text-[9px] font-future uppercase p-1">
              <MenubarItem onClick={() => setIsAboutOpen(true)}>ABOUT CARET</MenubarItem>
              <MenubarItem>DOCUMENTATION</MenubarItem>
              <MenubarItem>KEYBOARD SHORTCUTS</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex-1 max-w-xs mx-4">
        <div 
          className="h-6 bg-white/[0.02] border border-white/5 rounded px-3 flex items-center justify-between text-[8px] font-future text-white/20 cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => store.setIsCommandPaletteOpen(true)}
        >
          <span className="truncate">{store.activeFile?.name || 'SEARCH COMMANDS...'}</span>
          <div className="flex items-center gap-1 opacity-20">
            <Command className="h-2.5 w-2.5" />
            <span>P</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/30 hover:text-white" onClick={() => toast({ title: "INITIATING BUILD..." })}>
          <Play className="h-3 w-3" />
        </Button>
      </div>

      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="bg-black border-white/10 text-white crystal-panel max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-[10px] font-future tracking-[0.2em] flex items-center gap-4">
              <Image src="/logo.png" alt="Logo" width={16} height={16} />
              CARET IDE
            </DialogTitle>
            <DialogDescription className="text-white/40 text-[9px] font-future pt-4 leading-relaxed uppercase">
              PROFESSIONAL WORKSTATION v1.2.0<br />
              PURE BLACK MONOCHROMATIC ENGINE.<br />
              DESIGNED FOR SPEED AND PRECISION.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  )
}