
"use client"

import { useState, useEffect } from 'react'
import { FilePlus, Download, Sparkles, Command, Github, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

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
        title: "Installation",
        description: "Check your browser address bar for the install button.",
      })
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setDeferredPrompt(null)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black p-8 overflow-y-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10"
      >
        <div className="flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
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
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white uppercase">Caret</h1>
                <p className="text-muted-foreground font-black tracking-[0.4em] text-[10px] uppercase opacity-40">Pro Edition</p>
              </div>
            </div>
            <p className="text-muted-foreground/60 text-[13px] max-w-xs leading-relaxed font-medium">
              A high-performance, monochromatic development environment built for precision and speed.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Workspace</h2>
            <div className="grid gap-2">
              <WelcomeAction icon={<FilePlus className="h-4 w-4" />} title="New File" shortcut="Ctrl+N" onClick={onNewFile} />
              <WelcomeAction icon={<Download className="h-4 w-4" />} title="Install Desktop" shortcut="PWA" onClick={handleInstallClick} />
              <WelcomeAction icon={<Command className="h-4 w-4" />} title="Command Palette" shortcut="Ctrl+K" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-10 backdrop-blur-md">
            <div className="flex items-center gap-3 text-white">
              <Sparkles className="h-4 w-4 opacity-40" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Intelligence</h3>
            </div>
            
            <ul className="space-y-6">
              <FeatureItem title="Contextual Assistant" desc="Deep integration with Gemini for code analysis." />
              <FeatureItem title="Live Extensions" desc="Dynamic code execution via Firestore sync." />
              <FeatureItem title="Zero Latency" desc="Optimized Monaco engine for smooth editing." />
            </ul>

            <div className="pt-6 border-t border-white/5 flex items-center gap-6">
              <button className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-white transition-colors">Github</button>
              <button className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-white transition-colors">Docs</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function WelcomeAction({ icon, title, shortcut, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white">{title}</span>
      </div>
      <span className="text-[9px] font-bold text-white/10 group-hover:text-white/30 transition-colors">{shortcut}</span>
    </button>
  )
}

function FeatureItem({ title, desc }: any) {
  return (
    <li className="space-y-1.5">
      <h4 className="text-[11px] font-black uppercase tracking-widest text-white/80">{title}</h4>
      <p className="text-[11px] text-muted-foreground/50 leading-relaxed font-medium">{desc}</p>
    </li>
  )
}
