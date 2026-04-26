
"use client"

import { FilePlus, FolderOpen, Github, Settings, Layout, Code, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WelcomeScreenProps {
  onNewFile: () => void
  onOpenFile: () => void
}

export function WelcomeScreen({ onNewFile, onOpenFile }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0c0c0e] text-foreground p-8 overflow-y-auto">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl shadow-lg shadow-primary/20">
                C
              </div>
              <h1 className="text-4xl font-bold tracking-tight">CARET</h1>
            </div>
            <p className="text-xl text-muted-foreground">Editing evolved. AI-powered code workspace.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Start</h2>
            <div className="grid gap-2">
              <Button variant="ghost" className="justify-start gap-3 h-12 text-lg hover:bg-white/5" onClick={onNewFile}>
                <FilePlus className="h-5 w-5 text-primary" />
                New File
              </Button>
              <Button variant="ghost" className="justify-start gap-3 h-12 text-lg hover:bg-white/5" onClick={onOpenFile}>
                <FolderOpen className="h-5 w-5 text-primary" />
                Open Folder...
              </Button>
              <Button variant="ghost" className="justify-start gap-3 h-12 text-lg hover:bg-white/5">
                <Github className="h-5 w-5 text-primary" />
                Clone Repository...
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent</h2>
            <p className="text-sm text-muted-foreground italic px-4">No recent files</p>
          </div>
        </div>

        <div className="space-y-8 flex flex-col justify-center">
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold">AI Assistant Features</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Code className="h-4 w-4 mt-0.5 text-primary/60" />
                <span>Generate complex logic with natural language prompts.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Layout className="h-4 w-4 mt-0.5 text-primary/60" />
                <span>Explain existing code snippets instantly.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Settings className="h-4 w-4 mt-0.5 text-primary/60" />
                <span>Smart autocompletion that predicts your next move.</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <h4 className="text-sm font-bold group-hover:text-primary transition-colors">Keyboard Shortcuts</h4>
              <p className="text-[10px] text-muted-foreground mt-1">View and customize commands</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <h4 className="text-sm font-bold group-hover:text-primary transition-colors">Color Theme</h4>
              <p className="text-[10px] text-muted-foreground mt-1">Switch between dark and light</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
