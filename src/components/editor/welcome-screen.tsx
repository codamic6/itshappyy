"use client"

import { useState } from 'react'
import { FilePlus, Sparkles, Command, Github, Terminal, Monitor } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEditorStore } from '@/hooks/use-editor-store'
import Image from 'next/image'

interface WelcomeScreenProps {
  onNewFile: () => void
}

export function WelcomeScreen({ onNewFile }: WelcomeScreenProps) {
  const store = useEditorStore()

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0C0C0E] p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full space-y-12 relative z-10"
      >
        <div className="flex flex-col items-center space-y-6 text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-20 h-20"
          >
            <Image 
              src="/logo.png" 
              alt="Caret Logo" 
              fill 
              className="object-contain"
            />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight text-white font-future">CARET</h1>
            <p className="text-white/40 font-future text-sm uppercase tracking-[0.3em]">Professional Workstation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8">
          <div className="space-y-4">
            <h2 className="text-[11px] font-future uppercase tracking-[0.2em] text-white/30 ml-1">Start</h2>
            <div className="grid gap-2">
              <WelcomeAction icon={<FilePlus className="h-4 w-4" />} title="New File" onClick={onNewFile} />
              <WelcomeAction icon={<Command className="h-4 w-4" />} title="Open Commands" onClick={() => store.setIsCommandPaletteOpen(true)} />
              <WelcomeAction icon={<Monitor className="h-4 w-4" />} title="Install Desktop App" onClick={() => {
                // PWA Installation logic is handled by the browser/manifest
                toast({ title: "Checking browser support...", description: "Look for the install icon in your address bar." });
              }} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-[11px] font-future uppercase tracking-[0.2em] text-white/30 ml-1">Connect</h2>
            <div className="grid gap-2">
              <WelcomeAction icon={<Sparkles className="h-4 w-4" />} title="Ask Caret Intelligence" onClick={() => store.setIsAIPanelOpen(true)} />
              <WelcomeAction icon={<Github className="h-4 w-4" />} title="Sync with Cloud" onClick={() => {}} />
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
      className="flex items-center gap-4 w-full p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all group text-left"
    >
      <div className="text-white/40 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-[13px] font-future text-white/60 group-hover:text-white">{title}</span>
    </button>
  )
}