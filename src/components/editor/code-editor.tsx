
"use client"

import Editor from "@monaco-editor/react"
import { motion } from 'framer-motion'
import { FileCode, X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  content: string
  language: string
  fontSize: number
  onChange: (content: string) => void
  openFiles: any[]
  activeFileId: string | null
  onTabClick: (id: string) => void
  onTabClose: (id: string) => void
}

export function CodeEditor({ content, language, fontSize, onChange, openFiles, activeFileId, onTabClick, onTabClose }: CodeEditorProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#0D1117] overflow-hidden">
      {/* Tab Bar */}
      <div className="h-9 bg-[#0A0D12] border-b border-white/5 flex items-center overflow-x-auto no-scrollbar px-1">
        {openFiles.map((file) => (
          <div
            key={file.id}
            className={cn(
              "h-full min-w-[120px] flex items-center justify-between px-3 text-[11px] cursor-pointer group transition-all border-r border-white/5",
              activeFileId === file.id 
                ? "bg-[#0D1117] text-primary border-t-2 border-t-primary" 
                : "text-muted-foreground hover:bg-white/5"
            )}
            onClick={() => onTabClick(file.id)}
          >
            <div className="flex items-center gap-2 truncate">
              <FileCode className={cn("h-3 w-3", activeFileId === file.id ? "text-primary" : "text-muted-foreground")} />
              <span className="truncate">{file.name}</span>
            </div>
            <button 
              className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded transition-all ml-2"
              onClick={(e) => {
                e.stopPropagation()
                onTabClose(file.id)
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Monaco Container */}
      <div className="flex-1 relative animate-in fade-in duration-500">
        <Editor
          height="100%"
          language={language}
          value={content}
          theme="vs-dark"
          options={{
            fontSize,
            minimap: { enabled: true },
            smoothScrolling: true,
            cursorBlinking: "expand",
            fontFamily: "'JetBrains Mono', 'Source Code Pro', monospace",
            lineHeight: 22,
            padding: { top: 20 },
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            }
          }}
          onChange={(val) => onChange(val || "")}
        />
      </div>
    </div>
  )
}
