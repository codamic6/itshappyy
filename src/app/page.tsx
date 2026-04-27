"use client"

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityBar } from '@/components/editor/activity-bar';
import { EditorSidebar } from '@/components/editor/sidebar';
import { CodeEditor } from '@/components/editor/code-editor';
import { AIPanels } from '@/components/editor/ai-panels';
import { Terminal } from '@/components/editor/terminal';
import { WelcomeScreen } from '@/components/editor/welcome-screen';
import { CommandPalette } from '@/components/editor/command-palette';
import { useEditorStore } from '@/hooks/use-editor-store';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Terminal as TerminalIcon, GitBranch, MousePointer2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuBar } from '@/components/editor/menu-bar';
import { SettingsModal } from '@/components/editor/settings-modal';

export default function App() {
  const store = useEditorStore();
  const { toast } = useToast();
  
  // Resizable state
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [aiPanelWidth, setAiPanelWidth] = useState(340);
  const [terminalHeight, setTerminalHeight] = useState(260);
  
  const isResizingSidebar = useRef(false);
  const isResizingAI = useRef(false);
  const isResizingTerminal = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar.current) {
        setSidebarWidth(Math.max(150, Math.min(600, e.clientX - 50)));
      }
      if (isResizingAI.current) {
        setAiPanelWidth(Math.max(200, Math.min(800, window.innerWidth - e.clientX)));
      }
      if (isResizingTerminal.current) {
        setTerminalHeight(Math.max(100, Math.min(800, window.innerHeight - e.clientY - 28)));
      }
    };

    const handleMouseUp = () => {
      isResizingSidebar.current = false;
      isResizingAI.current = false;
      isResizingTerminal.current = false;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleNewFile = () => {
    store.setIsSidebarOpen(true);
    store.setActiveView('explorer');
    const id = store.createNode(`untitled-${Object.keys(store.nodes || {}).length + 1}.js`, 'file');
    store.selectFile(id);
    toast({ title: "New File Created", description: "Start coding now!" });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        switch (key) {
          case 'b': e.preventDefault(); store.setIsSidebarOpen(!store.ui.isSidebarOpen); break;
          case 'i': e.preventDefault(); store.setIsAIPanelOpen(!store.ui.isAIPanelOpen); break;
          case 'j': e.preventDefault(); store.setIsTerminalOpen(!store.ui.isTerminalOpen); break;
          case 'k':
          case 'p': e.preventDefault(); store.setIsCommandPaletteOpen(true); break;
          case 'n': e.preventDefault(); handleNewFile(); break;
          case 'd': e.preventDefault(); store.setIsShortcutsOpen(true); break;
          case 's': e.preventDefault(); toast({ title: "Saved", description: store.activeFile?.name || "Workspace saved" }); break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store.ui, store.activeFile, handleNewFile]);

  return (
    <div className="flex h-screen w-screen bg-black text-foreground overflow-hidden font-body selection:bg-white/20 selection:text-white">
      <ActivityBar 
        activeView={store.ui.activeView} 
        onViewChange={(view) => {
          if (store.ui.activeView === view && store.ui.isSidebarOpen) {
            store.setIsSidebarOpen(false);
          } else {
            store.setActiveView(view);
            store.setIsSidebarOpen(true);
          }
        }} 
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <MenuBar onNewFile={handleNewFile} />

        <div className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            {store.ui.isSidebarOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: sidebarWidth, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full border-r border-white/5 bg-black z-40 overflow-hidden relative flex"
              >
                <div className="flex-1 overflow-hidden">
                  <EditorSidebar />
                </div>
                <div 
                  className="resizer-h" 
                  onMouseDown={() => { isResizingSidebar.current = true; document.body.style.cursor = 'col-resize'; }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 flex flex-col min-w-0 bg-black relative">
            {!store.activeFileId && store.openTabs.length === 0 ? (
              <WelcomeScreen onNewFile={handleNewFile} />
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <CodeEditor 
                  content={store.activeFile?.content || ''}
                  language={store.activeFile?.language || 'javascript'}
                  fontSize={store.ui.fontSize}
                  onChange={(val) => store.activeFileId && store.updateFileContent(store.activeFileId, val)}
                  openFiles={store.openFiles}
                  activeFileId={store.activeFileId}
                  onTabClick={store.selectFile}
                  onTabClose={store.closeTab}
                />
                
                <AnimatePresence>
                  {store.ui.isTerminalOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: terminalHeight }}
                      exit={{ height: 0 }}
                      transition={{ type: 'spring', damping: 25 }}
                      className="overflow-hidden bg-black flex flex-col"
                    >
                      <div 
                        className="resizer-v" 
                        onMouseDown={() => { isResizingTerminal.current = true; document.body.style.cursor = 'row-resize'; }}
                      />
                      <Terminal 
                        history={store.terminalHistory} 
                        onExecute={store.executeCommand}
                        onClose={() => store.setIsTerminalOpen(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="h-7 bg-black border-t border-white/5 flex items-center px-4 justify-between text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] z-50">
              <div className="flex items-center gap-5">
                <button 
                  className={cn("flex items-center gap-2 hover:text-white transition-colors", store.ui.isTerminalOpen && "text-white")}
                  onClick={() => store.setIsTerminalOpen(!store.ui.isTerminalOpen)}
                >
                  <TerminalIcon className="h-3 w-3" /> Terminal
                </button>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                  <GitBranch className="h-3 w-3" /> main*
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MousePointer2 className="h-3 w-3" /> Ln 1, Col 1
                </div>
                {store.activeFile && (
                  <div className="text-white/60 font-black">{store.activeFile.language}</div>
                )}
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="h-3 w-3 animate-pulse" /> AI READY
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {store.ui.isAIPanelOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: aiPanelWidth, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full border-l border-white/5 bg-black z-40 overflow-hidden relative flex"
              >
                <div 
                  className="resizer-h" 
                  onMouseDown={() => { isResizingAI.current = true; document.body.style.cursor = 'col-resize'; }}
                />
                <div className="flex-1 overflow-hidden">
                  <AIPanels 
                    selectedText=""
                    activeFileContent={store.activeFile?.content}
                    onGeneratedCode={(code) => {
                      if (store.activeFileId) store.updateFileContent(store.activeFileId, code)
                    }}
                    onClose={() => store.setIsAIPanelOpen(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CommandPalette 
        isOpen={store.ui.isCommandPaletteOpen} 
        onClose={() => store.setIsCommandPaletteOpen(false)} 
      />

      <SettingsModal 
        isOpen={store.ui.isSettingsOpen} 
        onClose={() => store.setIsSettingsOpen(false)}
        fontSize={store.ui.fontSize}
        onFontSizeChange={store.setFontSize}
      />

      <Toaster />
    </div>
  )
}
