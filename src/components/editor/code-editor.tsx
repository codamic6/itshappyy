
"use client"

import { useEffect, useRef } from "react"
import Editor from "@monaco-editor/react"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion'
import { FileIcon } from "./file-icon"
import { useFirestore } from "@/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"

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
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)
  const firestore = useFirestore()

  // The API Bridge: Safely execute dynamic code with monaco and editor instances
  const applyPlugin = (code: string) => {
    if (!monacoRef.current || !editorRef.current) return

    try {
      const pluginFn = new Function('monaco', 'editor', code)
      pluginFn(monacoRef.current, editorRef.current)
      console.log("Caret Extension Applied Successfully")
    } catch (error) {
      console.error("Caret Extension Execution Failed:", error)
    }
  }

  // Execution Loop: Listen to Firestore and apply extensions live
  useEffect(() => {
    if (!firestore) return

    const extensionsRef = collection(firestore, 'caret_extensions')
    const q = query(extensionsRef, where('isEnabled', '==', true))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          const extensionData = change.doc.data()
          if (extensionData.code) {
            applyPlugin(extensionData.code)
          }
        }
      })
    })

    return () => unsubscribe()
  }, [firestore])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [activeFileId])

  return (
    <div className="flex-1 flex flex-col bg-[#0D1117] overflow-hidden">
      {/* Tab Bar */}
      <div className="h-10 bg-[#0A0D12] border-b border-white/5 flex items-center overflow-x-auto no-scrollbar px-1 shadow-inner">
        {openFiles.map((file) => (
          <div
            key={file.id}
            className={cn(
              "h-full min-w-[140px] flex items-center justify-between px-3 text-[11px] cursor-pointer group transition-all relative border-r border-white/5",
              activeFileId === file.id 
                ? "bg-[#0D1117] text-primary" 
                : "text-muted-foreground hover:bg-white/[0.03]"
            )}
            onClick={() => onTabClick(file.id)}
          >
            {activeFileId === file.id && (
              <motion.div layoutId="activeTab" className="absolute top-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
            )}
            <div className="flex items-center gap-2 truncate">
              <FileIcon fileName={file.name} className="h-3.5 w-3.5" />
              <span className={cn("truncate font-medium", activeFileId === file.id && "font-bold")}>{file.name}</span>
            </div>
            <button 
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-md transition-all ml-2"
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
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFileId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full h-full"
          >
            <Editor
              height="100%"
              language={language}
              value={content}
              theme="vs-dark"
              onMount={(editor, monaco) => {
                editorRef.current = editor
                monacoRef.current = monaco
                // Apply existing extensions once on mount
              }}
              options={{
                fontSize,
                minimap: { enabled: true, scale: 0.75, renderCharacters: false },
                smoothScrolling: true,
                cursorBlinking: "expand",
                cursorSmoothCaretAnimation: "on",
                fontFamily: "'JetBrains Mono', 'Source Code Pro', monospace",
                lineHeight: 24,
                padding: { top: 16 },
                bracketPairColorization: { enabled: true },
                automaticLayout: true,
                roundedSelection: true,
                scrollBeyondLastLine: false,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                  useShadows: false,
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8
                }
              }}
              onChange={(val) => onChange(val || "")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
