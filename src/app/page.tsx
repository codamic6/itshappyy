
"use client"

import React from 'react';
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
import { Code2, Sparkles, Terminal as TerminalIcon, PanelLeft, PanelRight, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function App() {
  const store = useEditorStore();

  return (
    <div className="flex h-screen w-screen bg-[#0A0D12] text-foreground overflow-hidden font-body">
      {/* Activity Bar (Fixed Left) */}
      <ActivityBar 
        activeView={store.ui.activeView} 
        onViewChange={(view) => store.setUi({ ...store.ui, activeView: view, isSidebarOpen: true })} 
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Sidebar (Explorer/Search etc) */}
        <AnimatePresence mode="wait">
          {store.ui.isSidebarOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full border-r border-white/5 bg-[#0D1117] z-40"
            >
              <EditorSidebar onNewFile={() => store.createFile()} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0D1117] relative">
          {!store.activeFileId ? (
            <WelcomeScreen onNewFile={() => store.createFile()} />
          ) : (
            <>
              <CodeEditor 
                content={store.activeFile?.content || ''}
                language={store.activeFile?.language || 'javascript'}
                fontSize={store.ui.fontSize}
                onChange={(val) => store.updateFileContent(store.activeFileId!, val)}
                openFiles={store.openFiles}
                activeFileId={store.activeFileId}
                onTabClick={store.selectFile}
                onTabClose={store.closeTab}
              />
              
              {/* Bottom Terminal */}
              <AnimatePresence>
                {store.ui.isTerminalOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 256 }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <Terminal 
                      history={store.terminalHistory} 
                      onExecute={store.executeCommand}
                      onClose={() => store.setUi({ ...store.ui, isTerminalOpen: false })}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Status Bar */}
          <div className="h-6 bg-[#0A0D12] border-t border-white/5 flex items-center px-4 justify-between text-[9px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em] z-50">
            <div className="flex items-center gap-4">
              <button 
                className={cn("flex items-center gap-1.5 hover:text-primary transition-colors", store.ui.isTerminalOpen && "text-primary")}
                onClick={() => store.setUi({ ...store.ui, isTerminalOpen: !store.ui.isTerminalOpen })}
              >
                <TerminalIcon className="h-3 w-3" /> Terminal
              </button>
              <span className="flex items-center gap-1.5"><GitBranch className="h-3 w-3" /> main*</span>
            </div>
            <div className="flex items-center gap-4">
              {store.activeFile && <span className="text-primary">{store.activeFile.language}</span>}
              <div className="flex items-center gap-1.5 text-primary">
                <Sparkles className="h-3 w-3" /> AI READY
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <AnimatePresence>
          {store.ui.isAIPanelOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full border-l border-white/5 bg-[#0D1117] z-40"
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

      {/* Overlays */}
      <CommandPalette 
        isOpen={store.ui.isCommandPaletteOpen} 
        onClose={() => store.setUi({ ...store.ui, isCommandPaletteOpen: false })} 
      />

      <Toaster />
    </div>
  )
}
