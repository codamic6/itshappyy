"use client"

import { useState } from 'react'
import { FilePlus, Sparkles, Command, Github, Terminal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEditorStore } from '@/hooks/use-editor-store'
import Image from 'next/image'

interface WelcomeScreenProps {
  onNewFile: () => void
}

export function WelcomeScreen({ onNewFile }: WelcomeScreenProps) {
  const store = useEditorStore()

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full space-y-12 relative z-10"
      >
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-16 h-16"
          >
            <Image 
              src="/logo.png" 
              alt="Caret Logo" 
              fill 
              className="object-contain"
            />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-widest text-white uppercase font-future">Caret</h1>
            <p className="text-white/20 font-future text-[9px] uppercase tracking-[0.4em]">Professional Edition</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <h2 className="text-[8px] font-future uppercase tracking-[0.4em] text-white/20 ml-1">Workspace</h2>
            <div className="grid gap-1">
              <WelcomeAction icon={<FilePlus className="h-3.5 w-3.5" />} title="NEW DATA" onClick={onNewFile} />
              <WelcomeAction icon={<Command className="h-3.5 w-3.5" />} title="OPEN COMMANDS" onClick={() => store.setIsCommandPaletteOpen(true)} />
              <WelcomeAction icon={<Terminal className="h-3.5 w-3.5" />} title="OPEN SHELL" onClick={() => store.setIsTerminalOpen(true)} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-[8px] font-future uppercase tracking-[0.4em] text-white/20 ml-1">Intelligence</h2>
            <div className="grid gap-1">
              <WelcomeAction icon={<Sparkles className="h-3.5 w-3.5" />} title="ENGAGE AI" onClick={() => store.setIsAIPanelOpen(true)} />
              <WelcomeAction icon={<Github className="h-3.5 w-3.5" />} title="SYNC CLOUD" onClick={() => {}} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function WelcomeAction({ icon, title, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 w-full p-3 rounded bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group"
    >
      <div className="text-white/20 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-future tracking-widest text-white/40 group-hover:text-white">{title}</span>
    </button>
  )
}