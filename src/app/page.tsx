
"use client"

import { useState, useEffect } from 'react'
import { Play, Sun, Moon, Github, X, Plus, Terminal as TerminalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { EditorSidebar } from '@/components/editor/sidebar'
import { CodeEditor } from '@/components/editor/code-editor'
import { AIPanels } from '@/components/editor/ai-panels'
import { WelcomeScreen } from '@/components/editor/welcome-screen'
import { Terminal } from '@/components/editor/terminal'
import { MenuBar } from '@/components/editor/menu-bar'
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
    isSidebarOpen,
    isAIPanelOpen
  } = useEditorStore()
  
  const [isDark, setIsDark] = useState(true)
  const [selectedText, setSelectedText] = useState('')
  const { toast } = useToast()

  const handleSave = () => {
    if (!activeFile) return
    toast({ title: "Saved", description: `${activeFile.name} changes persisted.` })
  }

  const handleNewFile = () => {
    const name = window.prompt("Enter file name (e.g. index.ts):")
    if (name) createNewFile(name)
  }

  const handleGeneratedCode = (code: string) => {
    if (!activeFile) return
    updateActiveFileContent(activeFile.content + "\n" + code)
  }

  const showWelcome = openFiles.length === 0 && !activeFile

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0D0D0D] text-foreground font-body">
      <MenuBar onNewFile={handleNewFile} onSave={handleSave} />

      <div className="flex-1 flex overflow-hidden">
        {isSidebarOpen && (
          <EditorSidebar 
            files={files} 
            activeFileId={activeFileId || ''} 
            onFileSelect={setActiveFileId} 
            onNewFile={handleNewFile}
            onDeleteFile={deleteFile}
          />
        )}

        <main className="flex-1 flex flex-col min-w-0 bg-[#0D0D0D]">
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
                  <FileIcon className={cn("h-3.5 w-3.5", activeFileId === file.id ? "text-primary" : "text-muted-foreground/60")} />
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
              <Button variant="ghost" size="icon" className="h-full w-9 border-r rounded-none" onClick={handleNewFile}>
                <Plus className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              </Button>
            </div>
          )}

          <div className="flex-1 flex flex-col overflow-hidden relative">
            {showWelcome ? (
              <WelcomeScreen onNewFile={handleNewFile} onOpenFile={() => toast({ title: "Explorer", description: "Select project folder..." })} />
            ) : activeFile ? (
              <CodeEditor 
                content={activeFile.content} 
                language={activeFile.language} 
                onChange={updateActiveFileContent}
                onSelectionChange={setSelectedText}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs uppercase tracking-[0.2em] font-bold">
                Select a file to start coding
              </div>
            )}
            
            {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
          </div>
          
          <div className="h-6 border-t bg-[#0A0A0A] flex items-center justify-between px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold z-40">
            <div className="flex items-center gap-4">
              <button 
                className={cn("flex items-center gap-1.5 transition-all hover:text-foreground", isTerminalOpen ? "text-primary" : "")}
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              >
                <TerminalIcon className="h-3 w-3" />
                <span>Terminal</span>
              </button>
              <span>Main*</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary/80">{activeFile?.language || 'No File'}</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>AI v2.0 READY</span>
              </div>
            </div>
          </div>
        </main>

        {isAIPanelOpen && (
          <AIPanels selectedText={selectedText} onGeneratedCode={handleGeneratedCode} />
        )}
      </div>
      <Toaster />
    </div>
  )
}

function FileIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>
    </svg>
  )
}
