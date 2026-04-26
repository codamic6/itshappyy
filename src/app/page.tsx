
"use client"

import { useState } from 'react'
import { Sun, Moon, Save, Play, Share2, Github, Terminal as TerminalIcon, X, Plus } from 'lucide-react'
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
    setActiveFileId, 
    updateActiveFileContent,
    createNewFile,
    isTerminalOpen,
    setIsTerminalOpen
  } = useEditorStore()
  
  const [isDark, setIsDark] = useState(true)
  const [selectedText, setSelectedText] = useState('')
  const { toast } = useToast()

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleSave = () => {
    if (!activeFile) return
    toast({
      title: "File Saved",
      description: `Successfully saved ${activeFile.name} to local workspace.`,
    })
  }

  const handleGeneratedCode = (code: string) => {
    if (!activeFile) return
    updateActiveFileContent(activeFile.content + "\n" + code)
    toast({ title: "Code inserted into editor" })
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* App Header */}
      <header className="h-12 border-b flex items-center justify-between px-4 bg-card z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFileId(null)}>
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-black text-xs">C</div>
            <span className="font-headline font-bold text-sm tracking-tight hidden sm:block">CARET</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 text-xs">File</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">Edit</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">Selection</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">View</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">Go</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">Help</Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {activeFile && (
            <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 hover:bg-primary/10" onClick={handleSave}>
              <Save className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          )}
          <Button variant="secondary" size="sm" className="h-8 gap-2">
            <Play className="h-4 w-4 text-green-500" />
            <span className="hidden sm:inline">Run</span>
          </Button>
          <div className="w-[1px] h-4 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <EditorSidebar 
          files={files} 
          activeFileId={activeFileId || ''} 
          onFileSelect={setActiveFileId} 
          onNewFile={createNewFile}
        />

        {/* Editor Central Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Editor Tabs Bar */}
          <div className="h-10 border-b bg-muted/5 flex items-center overflow-x-auto no-scrollbar">
            {files.map(file => (
              <div 
                key={file.id}
                className={cn(
                  "h-full px-4 flex items-center gap-2 cursor-pointer border-r text-[11px] transition-colors min-w-[120px] max-w-[200px]",
                  activeFileId === file.id 
                    ? "bg-background border-t-2 border-t-primary" 
                    : "text-muted-foreground hover:bg-muted/10"
                )}
                onClick={() => setActiveFileId(file.id)}
              >
                <span className="truncate flex-1">{file.name}</span>
                <X className="h-3 w-3 opacity-0 group-hover:opacity-100 hover:text-primary" />
              </div>
            ))}
            <Button variant="ghost" size="icon" className="h-full w-10 border-r" onClick={createNewFile}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden relative">
            {activeFile ? (
              <CodeEditor 
                content={activeFile.content} 
                language={activeFile.language} 
                onChange={updateActiveFileContent}
                onSelectionChange={setSelectedText}
              />
            ) : (
              <WelcomeScreen 
                onNewFile={createNewFile} 
                onOpenFile={() => toast({ title: "Explorer", description: "Opening folder dialog..." })} 
              />
            )}
            
            {/* Terminal Area */}
            {isTerminalOpen && (
              <Terminal onClose={() => setIsTerminalOpen(false)} />
            )}
          </div>
          
          {/* Integrated Status Bar */}
          <div className="h-6 border-t bg-card flex items-center justify-between px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            <div className="flex items-center gap-4">
              <div 
                className={cn(
                  "flex items-center gap-1.5 cursor-pointer transition-colors",
                  isTerminalOpen ? "text-primary" : "hover:text-foreground"
                )}
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
              >
                <TerminalIcon className="h-3 w-3" />
                <span>Terminal</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-foreground cursor-pointer">
                <span>Ln 1, Col 1</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-foreground cursor-pointer">
                <span>UTF-8</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary">{activeFile?.language || 'Plain Text'}</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>AI Connected</span>
              </div>
            </div>
          </div>
        </main>

        {/* AI Sidebar Panel */}
        <AIPanels 
          selectedText={selectedText} 
          onGeneratedCode={handleGeneratedCode} 
        />
      </div>
      <Toaster />
    </div>
  )
}
