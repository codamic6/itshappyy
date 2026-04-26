
"use client"

import { FilePlus, FolderOpen, Code, Sparkles, Layout, Settings } from 'lucide-react'

interface WelcomeScreenProps {
  onNewFile: () => void
}

export function WelcomeScreen({ onNewFile }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0D0D0D] text-foreground p-8 overflow-y-auto">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left duration-700">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-3xl shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                C
              </div>
              <div>
                <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40">CARET</h1>
                <p className="text-primary font-medium tracking-widest text-xs uppercase mt-1">AI-Powered Next-Gen Editor</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Quick Start</h2>
            <div className="grid gap-3">
              <WelcomeAction 
                icon={<FilePlus className="h-5 w-5" />} 
                title="New File" 
                shortcut="Ctrl+N" 
                onClick={onNewFile} 
              />
              <WelcomeAction 
                icon={<FolderOpen className="h-5 w-5" />} 
                title="Open Project" 
                shortcut="Ctrl+Shift+O" 
                onClick={() => alert("Select a project folder (Simulated)")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8 flex flex-col justify-center">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center gap-3 text-primary relative z-10">
              <Sparkles className="h-6 w-6" />
              <h3 className="font-bold text-lg">AI-First Workspace</h3>
            </div>
            
            <ul className="space-y-4 relative z-10">
              <AIFeatureItem 
                icon={<Code className="h-4 w-4" />} 
                title="Smart Autocomplete" 
                desc="Cursor-style inline code predictions" 
              />
              <AIFeatureItem 
                icon={<Layout className="h-4 w-4" />} 
                title="Context Chat" 
                desc="Chat with AI about your entire project" 
              />
              <AIFeatureItem 
                icon={<Settings className="h-4 w-4" />} 
                title="One-Click Fix" 
                desc="Automatically resolve syntax issues" 
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function WelcomeAction({ icon, title, shortcut, onClick }: { icon: React.ReactNode, title: string, shortcut: string, onClick?: () => void }) {
  return (
    <button 
      className="flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/5 hover:border-white/10 transition-all group"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-sm font-medium group-hover:text-white transition-colors">{title}</span>
      </div>
      <div className="flex items-center gap-1.5 opacity-30 group-hover:opacity-70 transition-opacity">
        <span className="text-[9px] font-bold border border-white/20 rounded px-1">{shortcut}</span>
      </div>
    </button>
  )
}

function AIFeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h4 className="text-xs font-bold">{title}</h4>
        <p className="text-[10px] text-muted-foreground">{desc}</p>
      </div>
    </li>
  )
}
