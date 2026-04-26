
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, Zap, FileCode, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (isOpen) setSearch('')
  }, [isOpen])

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
          
          <div className="p-2 max-h-[400px] overflow-y-auto">
            <CommandItem icon={<Zap className="text-yellow-400" />} title="Generate React Component" shortcut="⌘ G" />
            <CommandItem icon={<FileCode className="text-blue-400" />} title="Create New File" shortcut="⌘ N" />
            <CommandItem icon={<MessageSquare className="text-primary" />} title="Ask AI about Selection" shortcut="⌘ L" />
            <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 border-t border-white/5">Recently Used</div>
            <CommandItem icon={<FileCode />} title="App.tsx" />
            <CommandItem icon={<FileCode />} title="globals.css" />
          </div>
          
          <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-muted-foreground bg-black/20">
            <div className="flex gap-4">
              <span><kbd className="bg-white/5 px-1 rounded mr-1">↑↓</kbd> to navigate</span>
              <span><kbd className="bg-white/5 px-1 rounded mr-1">Enter</kbd> to select</span>
            </div>
            <span>Caret AI v1.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function CommandItem({ icon, title, shortcut }: any) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
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
