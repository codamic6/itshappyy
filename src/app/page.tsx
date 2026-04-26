
"use client"

import React, { useEffect } from 'react';
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
import { Sparkles, Terminal as TerminalIcon, GitBranch, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuBar } from '@/components/editor/menu-bar';

export default function App() {
  const store = useEditorStore();

  const handleNewFile = () => {
    store.setIsSidebarOpen(true);
    store.setUi({ ...store.ui, activeView: 'explorer' });
    const id = store.createNode(`untitled-${Object.keys(store.files).length + 1}.js`, 'file');
    store.selectFile(id);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            store.setIsSidebarOpen(!store.ui.isSidebarOpen);
            break;
          case 'i':
            e.preventDefault();
            store.setIsAIPanelOpen(!store.ui.isAIPanelOpen);
            break;
          case 'j':
            e.preventDefault();
            store.setIsTerminalOpen(!store.ui.isTerminalOpen);
            break;
          case 'k':
            e.preventDefault();
            store.setIsCommandPaletteOpen(!store.ui.isCommandPaletteOpen);
            break;
          case 'n':
            e.preventDefault();
            handleNewFile();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store.ui, store.setIsSidebarOpen, store.setIsAIPanelOpen, store.setIsTerminalOpen, store.setIsCommandPaletteOpen]);

  return (
    <div className="flex h-screen w-screen bg-[#0A0D12] text-foreground overflow-hidden font-body selection:bg-primary/30 selection:text-white">
      {/* 1. Activity Bar (Fixed Left) */}
      <ActivityBar 
        activeView={store.ui.activeView} 
        onViewChange={(view) => {
          if (store.ui.activeView === view && store.ui.isSidebarOpen) {
            store.setIsSidebarOpen(false);
          } else {
            store.setUi({ ...store.ui, activeView: view, isSidebarOpen: true });
          }
        }} 
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* 2. Top Menu Bar */}
        <MenuBar onNewFile={handleNewFile} />

        <div className="flex-1 flex overflow-hidden">
          {/* 3. Main Sidebar (Explorer) */}
          <AnimatePresence mode="wait">
            {store.ui.isSidebarOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: store.ui.sidebarWidth, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full border-r border-white/5 bg-[#0D1117] z-40 overflow-hidden"
              >
                <EditorSidebar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Center Canvas (Editor or Welcome) */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0D1117] relative">
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
                
                {/* 5. Bottom Terminal Panel */}
                <AnimatePresence>
                  {store.ui.isTerminalOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 260 }}
                      exit={{ height: 0 }}
                      transition={{ type: 'spring', damping: 25 }}
                      className="overflow-hidden bg-[#0A0D12]"
                    >
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

            {/* 6. Professional Status Bar */}
            <div className="h-7 bg-[#0A0D12] border-t border-white/5 flex items-center px-4 justify-between text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] z-50">
              <div className="flex items-center gap-5">
                <button 
                  className={cn("flex items-center gap-2 hover:text-primary transition-colors", store.ui.isTerminalOpen && "text-primary")}
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
                  <div className="text-primary/70 font-black">{store.activeFile.language}</div>
                )}
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-3 w-3 animate-pulse" /> AI READY
                </div>
              </div>
            </div>
          </div>

          {/* 7. Right AI Assistant Panel */}
          <AnimatePresence>
            {store.ui.isAIPanelOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 340, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full border-l border-white/5 bg-[#0D1117] z-40 overflow-hidden"
              >
                <AIPanels 
                  selectedText=""
                  activeFileContent={store.activeFile?.content}
                  onGeneratedCode={(code) => {
                    if (store.activeFileId) store.updateFileContent(store.activeFileId, code)
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 8. Floating Overlays */}
      <CommandPalette 
        isOpen={store.ui.isCommandPaletteOpen} 
        onClose={() => store.setIsCommandPaletteOpen(false)} 
      />

      <Toaster />
    </div>
  )
}
