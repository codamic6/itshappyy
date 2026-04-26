
"use client"

import { useState } from 'react'
import { X, Plus, Terminal as TerminalIcon, FilePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { EditorSidebar } from '@/components/editor/sidebar'
import { CodeEditor } from '@/components/editor/code-editor'
import { AIPanels } from '@/components/editor/ai-panels'
import { WelcomeScreen } from '@/components/editor/welcome-screen'
import { Terminal } from '@/components/editor/terminal'
import { MenuBar } from '@/components/editor/menu-bar'
import { SettingsModal } from '@/components/editor/settings-modal'
import { useEditorStore } from '@/hooks/use-editor-store'
import { cn } from '@/lib/utils'

export default function CaretApp() {
  const store = useEditorStore()
  const [selectedText, setSelectedText] = useState('')

  const handleNewFileExplorer = () => {
    store.setIsSidebarOpen(true)
    store.setIsCreatingFile(true)
  }

  const handleFastNewFile = () => {
    store.createFile()
  }

  const showWelcome = store.openTabs.length === 0 && !store.activeFileId && !store.isCreatingFile

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0D0D0D] text-foreground font-body">
      <MenuBar onNewFile={handleFastNewFile} />

      <div className="flex-1 flex overflow-hidden">
        {store.isSidebarOpen && (
          <EditorSidebar 
            onNewFile={handleNewFileExplorer}
          />
        )}

        <main className="flex-1 flex flex-col min-w-0 bg-[#0D0D0D]">
          {store.openTabs.length > 0 && (
            <div className="h-9 border-b bg-[#0A0A0A] flex items-center overflow-x-auto no-scrollbar">
              {store.openFiles.map(file => (
                <div 
                  key={file.id}
                  className={cn(
                    "h-full px-4 flex items-center gap-2 cursor-pointer border-r text-[11px] transition-all min-w-[120px] max-w-[200px] group",
                    store.activeFileId === file.id 
                      ? "bg-[#0D0D0D] border-t-2 border-t-primary" 
                      : "text-muted-foreground bg-black/20 hover:bg-black/40"
                  )}
                  onClick={() => store.setActiveFileId(file.id)}
                >
                  <FileIcon className={cn("h-3.5 w-3.5", store.activeFileId === file.id ? "text-primary" : "text-muted-foreground/60")} />
                  <span className="truncate flex-1 font-medium">{file.name}</span>
                  <button 
                    className="opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded p-0.5 transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      store.closeTab(file.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <Button variant="ghost" size="icon" className="h-full w-9 border-r rounded-none" onClick={handleFastNewFile}>
                <Plus className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              </Button>
            </div>
          )}

          <div className="flex-1 flex flex-col overflow-hidden relative">
            {showWelcome ? (
              <WelcomeScreen onNewFile={handleFastNewFile} />
            ) : store.activeFile ? (
              <CodeEditor 
                content={store.activeFile.content || ''} 
                language={store.activeFile.language || 'typescript'} 
                onChange={(val) => store.updateFileContent(store.activeFileId!, val)}
                onSelectionChange={setSelectedText}
                fontSize={store.fontSize}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-bold space-y-6">
                <div className="opacity-10">
                   <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                   </svg>
                </div>
                <div className="text-center space-y-4">
                  <p>No file open in current workspace</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary/20 hover:bg-primary/5 text-primary text-[10px] h-8 gap-2"
                    onClick={handleFastNewFile}
                  >
                    <FilePlus className="h-3.5 w-3.5" />
                    Create New File
                  </Button>
                </div>
              </div>
            )}
            
            {store.isTerminalOpen && <Terminal />}
          </div>
          
          <div className="h-6 border-t bg-[#0A0A0A] flex items-center justify-between px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold z-40">
            <div className="flex items-center gap-4">
              <button 
                className={cn("flex items-center gap-1.5 transition-all hover:text-foreground", store.isTerminalOpen ? "text-primary" : "")}
                onClick={() => store.setIsTerminalOpen(!store.isTerminalOpen)}
              >
                <TerminalIcon className="h-3 w-3" />
                <span>Terminal</span>
              </button>
              <span className="opacity-40">main*</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary/80">{store.activeFile?.language || 'No File'}</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                <span>AI READY</span>
              </div>
            </div>
          </div>
        </main>

        {store.isAIPanelOpen && (
          <AIPanels 
            selectedText={selectedText} 
            activeFileContent={store.activeFile?.content} 
            onGeneratedCode={(code) => {
              if (store.activeFileId) {
                store.updateFileContent(store.activeFileId, (store.activeFile?.content || '') + "\n" + code)
              }
            }} 
          />
        )}
      </div>

      <SettingsModal 
        isOpen={store.isSettingsOpen} 
        onClose={() => store.setIsSettingsOpen(false)} 
        fontSize={store.fontSize}
        onFontSizeChange={store.setFontSize}
      />
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
