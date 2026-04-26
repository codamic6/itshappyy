
"use client"

import { FilePlus, FolderOpen, Code, Sparkles, Layout, Settings, Command } from 'lucide-react'
import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onNewFile: () => void
}

export function WelcomeScreen({ onNewFile }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0D1117] p-8 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-20"
      >
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white font-black text-4xl shadow-[0_0_50px_rgba(124,58,237,0.4)]">
                C
              </div>
              <div>
                <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/30">CARET</h1>
                <p className="text-primary font-black tracking-[0.3em] text-[10px] uppercase mt-2">Next-Gen AI Editor</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Workspace Tools</h2>
            <div className="grid gap-2">
              <ActionCard icon={<FilePlus />} title="New File" shortcut="Ctrl+N" onClick={onNewFile} />
              <ActionCard icon={<FolderOpen />} title="Open Project" shortcut="Ctrl+O" />
              <ActionCard icon={<Command />} title="Command Palette" shortcut="Ctrl+K" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex items-center gap-3 text-primary relative z-10">
              <Sparkles className="h-6 w-6" />
              <h3 className="font-bold text-xl tracking-tight">AI-Native Environment</h3>
            </div>
            
            <ul className="space-y-6 relative z-10">
              <FeatureItem title="Predictive Typing" desc="Ghost-text code completions using Gemini 2.0" />
              <FeatureItem title="Smart Context" desc="AI understands your entire folder structure" />
              <FeatureItem title="Deep Analysis" desc="Explain complex logic with one click" />
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ActionCard({ icon, title, shortcut, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/5 hover:border-white/10 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-sm font-medium group-hover:text-white transition-colors">{title}</span>
      </div>
      <kbd className="text-[9px] font-bold text-muted-foreground/30 border border-white/5 rounded px-1.5 py-0.5">{shortcut}</kbd>
    </button>
  )
}

function FeatureItem({ title, desc }: any) {
  return (
    <li className="space-y-1">
      <h4 className="text-sm font-bold">{title}</h4>
      <p className="text-[11px] text-muted-foreground/60 leading-relaxed">{desc}</p>
    </li>
  )
}
