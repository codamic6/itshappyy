
"use client"

import { useEffect, useRef, useState } from "react"
import Editor from "@monaco-editor/react"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion'
import { FileIcon } from "./file-icon"
import { useFirestore, useUser } from "@/firebase"
import { collection, onSnapshot, query, where, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"

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
  const { user } = useUser()
  const { toast } = useToast()
  const [theme, setTheme] = useState('vs-dark')
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Caret API Bridge: Expose functionality to extensions
  const setupCaretAPI = (editor: any, monaco: any) => {
    (window as any).caret = {
      editor,
      monaco,
      insertText: (text: string) => {
        const selection = editor.getSelection()
        editor.executeEdits('', [{ range: selection, text }])
      },
      showNotification: (title: string, description: string) => {
        toast({ title, description })
      },
      activeFileId
    }
  }

  const applyPlugin = (code: string) => {
    if (!monacoRef.current || !editorRef.current) return
    try {
      const pluginFn = new Function('monaco', 'editor', 'caret', code)
      pluginFn(monacoRef.current, editorRef.current, (window as any).caret)
    } catch (error) {
      console.error("Extension Execution Failed:", error)
    }
  }

  // Live Extension Loop
  useEffect(() => {
    if (!firestore) return
    const extensionsRef = collection(firestore, 'caret_extensions')
    const q = query(extensionsRef, where('isEnabled', '==', true))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if ((change.type === "added" || change.type === "modified") && monacoRef.current) {
          applyPlugin(change.doc.data().code)
        }
      })
    })

    // Also listen to user-specific extensions
    let userUnsubscribe: any = null
    if (user) {
      const userExtRef = collection(firestore, 'users', user.uid, 'user_extensions')
      userUnsubscribe = onSnapshot(userExtRef, (snapshot) => {
        snapshot.docs.forEach(doc => applyPlugin(doc.data().code))
      })
    }

    return () => {
      unsubscribe()
      if (userUnsubscribe) userUnsubscribe()
    }
  }, [firestore, user, monacoRef.current])

  // Auto-Save to Firestore
  useEffect(() => {
    if (!activeFileId || !user || !firestore) return

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)

    saveTimeoutRef.current = setTimeout(() => {
      const fileRef = doc(firestore, 'users', user.uid, 'files', activeFileId)
      setDoc(fileRef, {
        content,
        updatedAt: serverTimestamp()
      }, { merge: true }).catch(() => {
        // Silent fail for auto-save permissions if not setup
      })
    }, 2000)

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [content, activeFileId, user, firestore])

  return (
    <div className="flex-1 flex flex-col bg-[#0D1117] overflow-hidden">
      <div className="h-10 bg-[#0A0D12] border-b border-white/5 flex items-center overflow-x-auto no-scrollbar px-1 shadow-inner">
        {openFiles.map((file) => (
          <div
            key={file.id}
            className={cn(
              "h-full min-w-[140px] flex items-center justify-between px-3 text-[11px] cursor-pointer group transition-all relative border-r border-white/5",
              activeFileId === file.id ? "bg-[#0D1117] text-primary" : "text-muted-foreground hover:bg-white/[0.03]"
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

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div key={activeFileId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className="w-full h-full">
            <Editor
              height="100%"
              language={language}
              value={content}
              theme={theme}
              onMount={(editor, monaco) => {
                editorRef.current = editor
                monacoRef.current = monaco
                setupCaretAPI(editor, monaco)
                editor.focus()
              }}
              options={{
                fontSize,
                minimap: { enabled: true, autohide: true },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                fontFamily: "'Source Code Pro', monospace",
                bracketPairColorization: { enabled: true },
                padding: { top: 10 },
                lineNumbers: "on",
                renderWhitespace: "selection",
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
                automaticLayout: true,
              }}
              onChange={(val) => onChange(val || "")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
