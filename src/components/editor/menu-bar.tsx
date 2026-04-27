"use client"

import { useRef, useState, useEffect } from 'react'
import { Command, Play, Github, Info, Keyboard, Download, Box } from 'lucide-react'
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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
  }

  return (
    <header className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-black z-50 crystal-panel">
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

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative w-4 h-4 opacity-80">
            <Image src="/logo.png" alt="Caret Logo" fill className="object-contain" />
          </div>
          <span className="text-[10px] font-future text-white tracking-[0.3em]">CARET.2099</span>
        </div>
        
        <Menubar className="border-none bg-transparent shadow-none h-auto p-0 gap-2">
          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[8px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/30 hover:text-white transition-all uppercase">SYSTEM</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10 text-[9px] font-future uppercase p-1">
              <MenubarItem onClick={onNewFile}>NEW DATA <MenubarShortcut>CTRL+N</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => fileInputRef.current?.click()}>IMPORT <MenubarShortcut>CTRL+O</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={handleInstallClick}>INSTALL HARDWARE</MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => toast({ title: "SAVED" })} disabled={!store.activeFileId}>SYNC <MenubarShortcut>CTRL+S</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[8px] font-future px-2 hover:bg-white/5 cursor-pointer text-white/30 hover:text-white transition-all uppercase">VISUALS</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10 text-[9px] font-future uppercase p-1">
              <MenubarItem onClick={() => store.setIsSidebarOpen(!store.ui.isSidebarOpen)}>TOGGLE SIDEBAR <MenubarShortcut>CTRL+B</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsTerminalOpen(!store.ui.isTerminalOpen)}>TOGGLE TERMINAL <MenubarShortcut>CTRL+J</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsSettingsOpen(true)}>CALIBRATION</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex-1 max-w-sm mx-8">
        <div 
          className="h-6 bg-white/[0.02] border border-white/5 rounded-sm px-4 flex items-center justify-between text-[8px] font-future text-white/20 cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => store.setIsCommandPaletteOpen(true)}
        >
          <span className="truncate">{store.activeFile?.name || 'SEARCH COMMANDS...'}</span>
          <div className="flex items-center gap-1 opacity-40">
            <Command className="h-2.5 w-2.5" />
            <span>P</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-white" onClick={() => toast({ title: "INITIATING BUILD..." })}>
          <Play className="h-3 w-3" />
        </Button>
        <div className="w-[1px] h-3 bg-white/10" />
        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-white" onClick={() => setIsAboutOpen(true)}>
          <Info className="h-3 w-3" />
        </Button>
      </div>

      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="bg-black border-white/10 text-white crystal-panel max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-[10px] font-future tracking-[0.4em] flex items-center gap-4">
              <Image src="/logo.png" alt="Logo" width={16} height={16} />
              CARET 2099
            </DialogTitle>
            <DialogDescription className="text-white/40 text-[9px] font-future pt-4 leading-relaxed uppercase tracking-wider">
              CORE OS v1.1.0<br />
              MONOCHROMATIC CRYSTAL ENVIRONMENT.<br />
              HARDWARE STATUS: OPTIMAL.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  )
}