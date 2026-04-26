
"use client"

import React, { useState, useEffect } from 'react';
import { MenuBar } from '@/components/editor/menu-bar';
import { EditorSidebar } from '@/components/editor/sidebar';
import { CodeEditor } from '@/components/editor/code-editor';
import { AIPanels } from '@/components/editor/ai-panels';
import { Terminal } from '@/components/editor/terminal';
import { WelcomeScreen } from '@/components/editor/welcome-screen';
import { SettingsModal } from '@/components/editor/settings-modal';
import { useEditorStore } from '@/hooks/use-editor-store';
import { Toaster } from '@/components/ui/toaster';
import { X, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function App() {
  const store = useEditorStore();
  const [selectedText, setSelectedText] = useState('');

  // Auto-detect empty state
  const noFilesOpen = store.openTabs.length === 0;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0D0D0D] text-foreground overflow-hidden font-body">
      {/* Top Header */}
      <MenuBar onNewFile={() => store.setIsCreatingFile(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        {store.isSidebarOpen && (
          <div className="h-full border-r border-white/5 bg-[#0A0A0A]">
            <EditorSidebar onNewFile={() => store.setIsCreatingFile(true)} />
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0D0D0D] relative">
          {noFilesOpen ? (
            <WelcomeScreen onNewFile={() => store.createFile()} />
          ) : (
            <>
              {/* Tab Bar */}
              <div className="h-9 bg-[#0A0A0A] border-b border-white/5 flex items-center overflow-x-auto no-scrollbar px-2 gap-0.5">
                {store.openFiles.map((file) => (
                  <div
                    key={file.id}
                    className={cn(
                      "h-full min-w-[120px] max-w-[200px] flex items-center justify-between px-3 text-[11px] cursor-pointer border-r border-white/5 group transition-all",
                      store.activeFileId === file.id 
                        ? "bg-[#0D0D0D] text-primary border-t-2 border-t-primary" 
                        : "text-muted-foreground hover:bg-white/5"
                    )}
                    onClick={() => store.selectFile(file.id)}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Code2 className="h-3 w-3 shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <button 
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        store.closeTab(file.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Code Canvas */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {store.activeFile && (
                  <CodeEditor 
                    content={store.activeFile.content || ''}
                    language={store.activeFile.language || 'typescript'}
                    fontSize={store.fontSize}
                    onChange={(val) => store.updateFileContent(store.activeFileId!, val)}
                    onSelectionChange={setSelectedText}
                  />
                )}
              </div>

              {/* Bottom Terminal */}
              {store.isTerminalOpen && <Terminal />}
            </>
          )}

          {/* Status Bar */}
          <div className="h-6 bg-[#0A0A0A] border-t border-white/5 flex items-center px-4 justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-bold z-30">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors" onClick={() => store.setIsTerminalOpen(!store.isTerminalOpen)}>
                Terminal
              </span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-4">
              {store.activeFile && <span className="text-primary">{store.activeFile.language}</span>}
              <span className="hover:text-primary transition-colors cursor-pointer">AI: Connected</span>
            </div>
          </div>
        </div>

        {/* Right AI Assistant Panel */}
        {store.isAIPanelOpen && (
          <div className="h-full border-l border-white/5">
            <AIPanels 
              selectedText={selectedText}
              activeFileContent={store.activeFile?.content}
              onGeneratedCode={(code) => {
                if (store.activeFileId) {
                  const currentContent = store.activeFile?.content || '';
                  store.updateFileContent(store.activeFileId, currentContent + "\n" + code);
                } else {
                  const newId = store.createFile();
                  if (newId) store.updateFileContent(newId, code);
                }
              }}
            />
          </div>
        )}
      </div>

      <SettingsModal 
        isOpen={store.isSettingsOpen}
        onClose={() => store.setIsSettingsOpen(false)}
        fontSize={store.fontSize}
        onFontSizeChange={(val) => store.setFontSize(val)}
      />

      <Toaster />
    </div>
  );
}
