
"use client"

import { useState, useEffect } from 'react'
import { FilePlus, FolderOpen, Code, Sparkles, Command, Github, Globe, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface WelcomeScreenProps {
  onNewFile: () => void
}

export function WelcomeScreen({ onNewFile }: WelcomeScreenProps) {
  const { toast } = useToast()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Installation Status",
        description: "App is already installed or your browser doesn't support automatic installation here.",
      })
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setDeferredPrompt(null)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0D1117] p-8 overflow-y-auto relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10"
      >
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-5">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-3xl shadow-[0_0_40px_rgba(124,58,237,0.3)]"
              >
                C
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold tracking-tighter text-white">Caret</h1>
                <p className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">Pro AI Code Editor</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Experience the next generation of software development with real-time AI context and professional-grade editing tools.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 mb-4">Start</h2>
            <div className="grid gap-3">
              <WelcomeAction icon={<FilePlus className="h-4 w-4" />} title="New File" shortcut="Ctrl+N" onClick={onNewFile} />
              <WelcomeAction icon={<Download className="h-4 w-4 text-primary" />} title="Install Desktop App" shortcut="PWA" onClick={handleInstallClick} />
              <WelcomeAction icon={<Command className="h-4 w-4" />} title="Command Palette" shortcut="Ctrl+K" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-8 backdrop-blur-sm shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold text-lg tracking-tight">AI Intelligence</h3>
            </div>
            
            <ul className="space-y-5">
              <FeatureItem title="Context-Aware Chat" desc="Ask questions about your entire codebase effortlessly." />
              <FeatureItem title="Code Generation" desc="Build complex modules from simple natural language prompts." />
              <FeatureItem title="Deep Logic Analysis" desc="Understand obscure code with high-level AI reasoning." />
            </ul>

            <div className="pt-4 border-t border-white/5 flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold tracking-widest gap-2 opacity-50 hover:opacity-100">
                <Github className="h-3.5 w-3.5" /> Source
              </Button>
              <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold tracking-widest gap-2 opacity-50 hover:opacity-100">
                <Globe className="h-3.5 w-3.5" /> Community
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function WelcomeAction({ icon, title, shortcut, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary/30 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-white/[0.03] text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all">
          {icon}
        </div>
        <span className="text-sm font-medium group-hover:text-white transition-colors">{title}</span>
      </div>
      <kbd className="text-[9px] font-bold text-muted-foreground/30 bg-white/[0.03] border border-white/5 rounded px-2 py-1 uppercase">{shortcut}</kbd>
    </button>
  )
}

function FeatureItem({ title, desc }: any) {
  return (
    <li className="space-y-1">
      <h4 className="text-[13px] font-bold text-foreground/90">{title}</h4>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
    </li>
  )
}
