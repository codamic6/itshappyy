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
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-xl bg-black border border-white/10 rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative z-10"
        >
          <div className="flex items-center px-4 h-14 border-b border-white/5 gap-4">
            <Command className="h-4 w-4 text-white opacity-40" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/40 font-future"
              placeholder="COMMAND SEARCH..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && onClose()}
            />
          </div>
          
          <div className="p-2 max-h-[450px] overflow-y-auto no-scrollbar bg-black">
            <div className="px-3 py-2 text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em] mt-1">PRIMARY ACTIONS</div>
            <CommandItem 
              icon={<Zap className="h-4 w-4" />} 
              title="GENERATE REACT NODE" 
              shortcut="CTRL+G" 
              onClick={handleGenerateComponent}
            />
            <CommandItem 
              icon={<FileCode className="h-4 w-4" />} 
              title="INITIALIZE NEW DATA" 
              shortcut="CTRL+N" 
              onClick={handleCreateFile}
            />
            <CommandItem 
              icon={<MessageSquare className="h-4 w-4" />} 
              title="ENGAGE AI ASSISTANT" 
              shortcut="CTRL+I" 
              onClick={handleAskAI}
            />
            
            {store.recentlyOpened.length > 0 && (
              <>
                <div className="px-3 py-2 text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.3em] mt-3 border-t border-white/5 pt-4">RECENTLY ACCESSED</div>
                {store.recentlyOpened.map((id: string) => {
                  const node = store.nodes[id]
                  if (!node) return null
                  return (
                    <CommandItem 
                      key={id}
                      icon={<FileIcon fileName={node.name} className="h-4 w-4" />} 
                      title={node.name.toUpperCase()} 
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
          
          <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-[8px] font-future text-muted-foreground/20 bg-white/[0.01] tracking-widest uppercase">
            <div className="flex gap-6">
              <span>↑↓ NAVIGATE</span>
              <span>ENTER SELECT</span>
            </div>
            <span>CARET.CORE.V1</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function CommandItem({ icon, title, shortcut, onClick }: any) {
  return (
    <div 
      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-all group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground/40 group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-[11px] font-future tracking-widest text-white/60 group-hover:text-white">{title}</span>
      </div>
      {shortcut && <span className="text-[9px] text-white/10 group-hover:text-white/30 font-future">{shortcut}</span>}
    </div>
  )
}
