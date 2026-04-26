"use client"

import { useState, useEffect } from 'react'
import { Sun, Moon, Save, Play, Share2, Github, Terminal as TerminalIcon, X, Plus, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { EditorSidebar } from '@/components/editor/sidebar'
import { CodeEditor } from '@/components/editor/code-editor'
import { AIPanels } from '@/components/editor/ai-panels'
import { WelcomeScreen } from '@/components/editor/welcome-screen'
import { Terminal } from '@/components/editor/terminal'
import { useEditorStore } from '@/hooks/use-editor-store'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function CaretApp() {
  const { 
    files, 
    activeFile, 
    activeFileId, 
    openFiles,
    setActiveFileId, 
    updateActiveFileContent,
    createNewFile,
    closeFile,
    deleteFile,
    isTerminalOpen,
    setIsTerminalOpen,
    isSidebarOpen
  } = useEditorStore()
  
  const [isDark, setIsDark] = useState(true)
  const [selectedText, setSelectedText] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        toast({ title: "Command Palette", description: "Ctrl+Shift+P pressed" })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeFile])

  const handleSave = () => {
    if (!activeFile) return
    toast({
      title: "File Saved",
      description: `Changes to ${activeFile.name} preserved.`,
    })
  }

  const handleGeneratedCode = (code: string) => {
    if (!activeFile) return
    updateActiveFileContent(activeFile.content + "\n" + code)
  }

  // Determine if we should show the welcome screen
  // Show if no file is active and no files are even in the system
  const showWelcome = !activeFile && openFiles.length === 0

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0D0D0D] text-foreground font-body">
      {/* Navbar */}
      <header className="h-10 border-b flex items-center justify-between px-4 bg-[#0A0A0A] z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveFileId('')}>
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-[10px] shadow-[0_0_10px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all">C</div>
            <span className="font-bold text-xs tracking-widest hidden sm:block">CARET</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-0.5">
            {['File', 'Edit', 'Selection', 'View', 'Go', 'Terminal', 'Help'].map(item => (
              <Button key={item} variant="ghost" size="sm" className="h-7 text-[11px] font-medium px-2 hover:bg-white/5">
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="h-7 bg-muted/20 border border-border rounded-md px-3 flex items-center justify-between text-[11px] text-muted-foreground cursor-pointer hover:bg-muted/30 transition-all">
            <span className="truncate">{activeFile?.name || 'Search files or commands'}</span>
            <div className="flex items-center gap-1">
              <Command className="h-3 w-3" />
              <span>P</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-green-500" title="Run Code">
            <Play className="h-3.5 w-3.5" />
          </Button>
          <div className="w-[1px] h-3 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Github className="h-3.5 w-3.5" />
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {isSidebarOpen && (
          <EditorSidebar 
            files={files} 
            activeFileId={activeFileId || ''} 
            onFileSelect={setActiveFileId} 
            onNewFile={createNewFile}
            onDeleteFile={deleteFile}
          />
        )}

        <main className="flex-1 flex flex-col min-w-0 bg-[#0D0D0D]">
          {/* Tabs Bar - Only visible if there are open files */}
          {openFiles.length > 0 && (
            <div className="h-9 border-b bg-[#0A0A0A] flex items-center overflow-x-auto no-scrollbar">
              {openFiles.map(file => (
                <div 
                  key={file.id}
                  className={cn(
                    "h-full px-4 flex items-center gap-2 cursor-pointer border-r text-[11px] transition-all min-w-[120px] max-w-[200px] group",
                    activeFileId === file.id 
                      ? "bg-[#0D0D0D] border-t-2 border-t-primary" 
                      : "text-muted-foreground bg-black/20 hover:bg-black/40"
                  )}
                  onClick={() => setActiveFileId(file.id)}
                >
                  <FileCode className={cn("h-3.5 w-3.5", activeFileId === file.id ? "text-primary" : "text-muted-foreground/60")} />
                  <span className="truncate flex-1 font-medium">{file.name}</span>
                  <button 
                    className="opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded p-0.5 transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      closeFile(file.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <Button variant="ghost" size="icon" className="h-full w-9 border-r rounded-none" onClick={createNewFile}>
                <Plus className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              </Button>
            </div>
          )}

          <div className="flex-1 flex flex-col overflow-hidden relative">
            {showWelcome ? (
              <WelcomeScreen 
                onNewFile={createNewFile} 
                onOpenFile={() => toast({ title: "Explorer", description: "Project picker..." })} 
              />
            ) : activeFile ? (
              <CodeEditor 
                content={activeFile.content} 
                language={activeFile.language} 
                onChange={updateActiveFileContent}
                onSelectionChange={setSelectedText}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs uppercase tracking-[0.2em] font-bold">
                No file selected
              </div>
            )}
            
            {isTerminalOpen && (
              <Terminal onClose={() => setIsTerminalOpen(false)} />
            )}
          </div>
          
          {/* Status Bar */}
          <div className="h-6 border-t bg-[#0A0A0A] flex items-center justify-between px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold z-40">
            <div className="flex items-center gap-4">
              <button 
                className={cn(
                  "flex items-center gap-1.5 transition-all hover:text-foreground",
                  isTerminalOpen ? "text-primary" : ""
                )}
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              >
                <TerminalIcon className="h-3 w-3" />
                <span>Terminal</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="hover:text-foreground cursor-pointer">Main*</span>
                <span className="hover:text-foreground cursor-pointer">0 Errors</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary/80">{activeFile?.language || 'No File'}</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                <span>AI Core v2.0</span>
              </div>
            </div>
          </div>
        </main>

        <AIPanels 
          selectedText={selectedText} 
          onGeneratedCode={handleGeneratedCode} 
        />
      </div>
      <Toaster />
    </div>
  )
}

function FileCode(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>
    </svg>
  )
}
