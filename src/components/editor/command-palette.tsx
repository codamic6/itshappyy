
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, Zap, FileCode, MessageSquare, Clock } from 'lucide-react'
import { useEditorStore } from '@/hooks/use-editor-store'
import { FileIcon } from './file-icon'
import { aiCodeGeneration } from '@/ai/flows/ai-code-generation-flow'
import { useToast } from '@/hooks/use-toast'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const store = useEditorStore()
  const { toast } = useToast()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (isOpen) setSearch('')
  }, [isOpen])

  const handleGenerateComponent = async () => {
    onClose()
    toast({ title: "AI Generation", description: "Generating base React component..." })
    try {
      const res = await aiCodeGeneration({ description: "Create a modern, responsive React component with Tailwind CSS." })
      const id = store.createNode('GeneratedComponent.tsx', 'file', null, res.code)
      store.selectFile(id)
    } catch (err) {
      toast({ variant: 'destructive', title: "Generation Failed" })
    }
  }

  const handleCreateFile = () => {
    onClose()
    store.setIsSidebarOpen(true)
    store.setActiveView('explorer')
    // Handled by user in sidebar usually, but we could trigger an input here if we wanted
    toast({ title: "New File", description: "Use the explorer to name your new file." })
  }

  const handleAskAI = () => {
    onClose()
    store.setIsAIPanelOpen(true)
    toast({ title: "Caret AI", description: "Ready for your questions." })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-xl bg-[#1A1F26] border border-white/10 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative z-10"
        >
          <div className="flex items-center px-4 h-12 border-b border-white/5 gap-3">
            <Command className="h-4 w-4 text-primary" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              placeholder="What would you like to do? (Ctrl+K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && onClose()}
            />
          </div>
          
          <div className="p-2 max-h-[400px] overflow-y-auto no-scrollbar">
            <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Actions</div>
            <CommandItem 
              icon={<Zap className="text-yellow-400" />} 
              title="Generate React Component" 
              shortcut="⌘ G" 
              onClick={handleGenerateComponent}
            />
            <CommandItem 
              icon={<FileCode className="text-blue-400" />} 
              title="Create New File" 
              shortcut="⌘ N" 
              onClick={handleCreateFile}
            />
            <CommandItem 
              icon={<MessageSquare className="text-primary" />} 
              title="Ask AI about Selection" 
              shortcut="⌘ L" 
              onClick={handleAskAI}
            />
            
            {store.recentlyOpened.length > 0 && (
              <>
                <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 border-t border-white/5">Recently Used</div>
                {store.recentlyOpened.map((id: string) => {
                  const node = store.nodes[id]
                  if (!node) return null
                  return (
                    <CommandItem 
                      key={id}
                      icon={<FileIcon fileName={node.name} />} 
                      title={node.name} 
                      onClick={() => {
                        store.selectFile(id)
                        onClose()
                      }}
                    />
                  )
                })}
              </>
            )}
          </div>
          
          <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-muted-foreground bg-black/20">
            <div className="flex gap-4">
              <span><kbd className="bg-white/5 px-1 rounded mr-1">↑↓</kbd> to navigate</span>
              <span><kbd className="bg-white/5 px-1 rounded mr-1">Enter</kbd> to select</span>
            </div>
            <span>Caret AI v1.0.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function CommandItem({ icon, title, shortcut, onClick }: any) {
  return (
    <div 
      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground group-hover:text-primary transition-colors">
          {icon}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      {shortcut && <span className="text-[10px] text-muted-foreground font-mono">{shortcut}</span>}
    </div>
  )
}
