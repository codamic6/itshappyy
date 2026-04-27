
"use client"

import { useRef, useState, useEffect } from 'react'
import { Command, Play, Github, Info, Keyboard, Download } from 'lucide-react'
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
    if (!deferredPrompt) {
      toast({
        title: "Installation Status",
        description: "Please check your browser address bar for the install icon.",
      })
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      toast({ title: "Success", description: "CARET IDE installed." })
    }
  }

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
      toast({ title: "File Opened", description: file.name })
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <header className="h-10 border-b flex items-center justify-between px-4 bg-black z-50">
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5">
            <Image 
              src="/logo.png" 
              alt="Caret Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="font-bold text-[11px] tracking-[0.2em] text-white">CARET</span>
        </div>
        
        <Menubar className="border-none bg-transparent shadow-none h-auto p-0 gap-1">
          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[10px] uppercase font-bold px-2 hover:bg-white/5 cursor-pointer text-muted-foreground hover:text-white transition-colors">File</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10">
              <MenubarItem onClick={onNewFile}>New File <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={handleOpenFileClick}>Open File <MenubarShortcut>Ctrl+O</MenubarShortcut></MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={handleInstallClick} className="font-bold">
                <Download className="h-3 w-3 mr-2" /> Install IDE
              </MenubarItem>
              <MenubarSeparator className="bg-white/5" />
              <MenubarItem onClick={() => toast({ title: "Saved", description: store.activeFile?.name })} disabled={!store.activeFileId}>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[10px] uppercase font-bold px-2 hover:bg-white/5 cursor-pointer text-muted-foreground hover:text-white transition-colors">View</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10">
              <MenubarItem onClick={() => store.setIsSidebarOpen(!store.ui.isSidebarOpen)}>Toggle Sidebar <MenubarShortcut>Ctrl+B</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsTerminalOpen(!store.ui.isTerminalOpen)}>Toggle Terminal <MenubarShortcut>Ctrl+J</MenubarShortcut></MenubarItem>
              <MenubarItem onClick={() => store.setIsSettingsOpen(true)}>Preferences</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="h-7 text-[10px] uppercase font-bold px-2 hover:bg-white/5 cursor-pointer text-muted-foreground hover:text-white transition-colors">Help</MenubarTrigger>
            <MenubarContent className="bg-black border-white/10">
              <MenubarItem onClick={() => setIsAboutOpen(true)}>About</MenubarItem>
              <MenubarItem onClick={() => store.setIsShortcutsOpen(true)}>Shortcuts <MenubarShortcut>Ctrl+D</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex-1 max-w-sm mx-4 hidden md:block">
        <div 
          className="h-7 bg-white/[0.03] border border-white/5 rounded px-3 flex items-center justify-between text-[10px] text-muted-foreground cursor-pointer hover:bg-white/5 transition-all"
          onClick={() => store.setIsCommandPaletteOpen(true)}
        >
          <span className="truncate">{store.activeFile?.name || 'Quick Search'}</span>
          <div className="flex items-center gap-1 opacity-50">
            <Command className="h-3 w-3" />
            <span>P</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-white" onClick={() => toast({ title: "Build", description: "Running..." })}>
          <Play className="h-3 w-3" />
        </Button>
        <div className="w-[1px] h-3 bg-white/10" />
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-white" onClick={() => window.open('https://github', '_blank')}>
          <Github className="h-3 w-3" />
        </Button>
      </div>

      <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
        <DialogContent className="bg-black border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={24} height={24} />
              CARET IDE
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              Version 1.1.0<br />
              High-performance monochromatic environment.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={store.ui.isShortcutsOpen} onOpenChange={store.setIsShortcutsOpen}>
        <DialogContent className="bg-black border-white/10 text-foreground max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <ShortcutRow label="Explorer" shortcut="Ctrl + B" />
            <ShortcutRow label="AI Panel" shortcut="Ctrl + I" />
            <ShortcutRow label="Terminal" shortcut="Ctrl + J" />
            <ShortcutRow label="Command Palette" shortcut="Ctrl + K" />
            <ShortcutRow label="Save" shortcut="Ctrl + S" />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

function ShortcutRow({ label, shortcut }: { label: string, shortcut: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] border-b border-white/5 pb-2">
      <span className="text-muted-foreground uppercase font-bold">{label}</span>
      <kbd className="bg-white/5 px-2 py-0.5 rounded border border-white/10 font-mono text-white">{shortcut}</kbd>
    </div>
  )
}
