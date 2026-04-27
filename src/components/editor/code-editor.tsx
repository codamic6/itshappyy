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
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // VS Code API Compatibility Layer
  const createVSCodeMock = (editor: any, monaco: any) => {
    return {
      window: {
        showInformationMessage: (msg: string) => toast({ title: "Extension Info", description: msg }),
        showErrorMessage: (msg: string) => toast({ variant: "destructive", title: "Extension Error", description: msg }),
        activeTextEditor: {
          document: {
            getText: () => editor.getValue(),
            languageId: language
          },
          selection: editor.getSelection()
        }
      },
      commands: {
        registerCommand: (id: string, callback: any) => {
          editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, callback);
        }
      },
      languages: {
        registerCompletionItemProvider: (lang: string, provider: any) => {
          monaco.languages.registerCompletionItemProvider(lang, provider);
        }
      }
    }
  }

  const setupCaretAPI = (editor: any, monaco: any) => {
    const vscode = createVSCodeMock(editor, monaco);
    (window as any).caret = {
      editor,
      monaco,
      vscode,
      insertText: (text: string) => {
        const selection = editor.getSelection()
        editor.executeEdits('', [{ range: selection, text }])
      },
      showNotification: (title: string, description: string) => {
        toast({ title, description })
      },
      activeFileId
    };
    (window as any).require = (mod: string) => {
      if (mod === 'vscode') return vscode;
      return {};
    };
  }

  const applyPlugin = (ext: any) => {
    if (!monacoRef.current || !editorRef.current) return
    try {
      if (ext.type === 'theme' && ext.themeData) {
        monacoRef.current.editor.defineTheme(ext.id, ext.themeData);
        monacoRef.current.editor.setTheme(ext.id);
        return;
      }
      if (ext.code) {
        const vscode = (window as any).caret.vscode;
        const pluginFn = new Function('monaco', 'editor', 'caret', 'vscode', 'require', ext.code);
        pluginFn(monacoRef.current, editorRef.current, (window as any).caret, vscode, (window as any).require);
      }
    } catch (error) {
      console.error(`[Caret] Extension "${ext.name}" execution failed:`, error);
    }
  }

  useEffect(() => {
    if (!firestore) return
    const extensionsRef = collection(firestore, 'caret_extensions')
    const q = query(extensionsRef, where('isEnabled', '==', true))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if ((change.type === "added" || change.type === "modified") && monacoRef.current) {
          applyPlugin({ id: change.doc.id, ...change.doc.data() })
        }
      })
    })
    return () => unsubscribe()
  }, [firestore, monacoRef.current])

  useEffect(() => {
    if (!activeFileId || !user || !firestore) return
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      const fileRef = doc(firestore, 'users', user.uid, 'files', activeFileId)
      setDoc(fileRef, { content, updatedAt: serverTimestamp() }, { merge: true }).catch(() => {})
    }, 2000)
    return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current) }
  }, [content, activeFileId, user, firestore])

  return (
    <div className="flex-1 flex flex-col bg-[#0C0C0E] overflow-hidden relative">
      {/* Tabs */}
      <div className="h-10 bg-[#0A0A0A] border-b border-white/5 flex items-center overflow-x-auto no-scrollbar px-1 relative z-10">
        {openFiles.map((file) => (
          <div
            key={file.id}
            className={cn(
              "h-full min-w-[140px] flex items-center justify-between px-3 text-[10px] cursor-pointer group transition-all relative border-r border-white/5",
              activeFileId === file.id ? "bg-[#0C0C0E] text-white" : "text-white/30 hover:bg-white/[0.02] hover:text-white/50"
            )}
            onClick={() => onTabClick(file.id)}
          >
            {activeFileId === file.id && (
              <motion.div layoutId="activeTabGlow" className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20" />
            )}
            <div className="flex items-center gap-2 truncate">
              <FileIcon fileName={file.name} className="h-3 w-3" />
              <span className={cn("truncate font-headline tracking-widest", activeFileId === file.id && "text-white")}>{file.name.toUpperCase()}</span>
            </div>
            <button 
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded-full transition-all ml-2"
              onClick={(e) => { e.stopPropagation(); onTabClose(file.id); }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Editor Surface */}
      <div className="flex-1 relative bg-[#0C0C0E]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFileId} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.1 }} 
            className="w-full h-full"
          >
            <Editor
              height="100%"
              language={language}
              value={content}
              theme="hc-black"
              onMount={(editor, monaco) => {
                editorRef.current = editor
                monacoRef.current = monaco
                setupCaretAPI(editor, monaco)
                
                monaco.editor.defineTheme('caret-professional', {
                  base: 'vs-dark',
                  inherit: true,
                  rules: [],
                  colors: {
                    'editor.background': '#0C0C0E',
                    'editor.lineHighlightBackground': '#111114',
                    'editorCursor.foreground': '#FFFFFF',
                    'editor.selectionBackground': '#FFFFFF10',
                  }
                });
                monaco.editor.setTheme('caret-professional');
                editor.focus()
              }}
              options={{
                fontSize,
                minimap: { enabled: true, autohide: true, scale: 0.5 },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                fontFamily: "'Source Code Pro', monospace",
                bracketPairColorization: { enabled: true },
                padding: { top: 20 },
                lineNumbers: "on",
                renderWhitespace: "none",
                scrollbar: {
                  verticalScrollbarSize: 4,
                  horizontalScrollbarSize: 4,
                  useShadows: false,
                },
                automaticLayout: true,
                letterSpacing: 0.5,
              }}
              onChange={(val) => onChange(val || "")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}