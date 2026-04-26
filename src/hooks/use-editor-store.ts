
"use client"

import { useState, useCallback } from 'react'

export interface FileItem {
  id: string
  name: string
  content: string
  language: string
}

const INITIAL_FILES: FileItem[] = [
  {
    id: '1',
    name: 'main.ts',
    content: '// CARET Editor\nexport function start() {\n  console.log("Welcome to CARET!");\n}',
    language: 'typescript'
  }
]

export function useEditorStore() {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES)
  const [activeFileId, setActiveFileId] = useState<string | null>(null) // Start with null for welcome screen
  const [isTerminalOpen, setIsTerminalOpen] = useState(true)

  const activeFile = files.find(f => f.id === activeFileId) || null

  const updateActiveFileContent = useCallback((newContent: string) => {
    if (!activeFileId) return
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: newContent } : f))
  }, [activeFileId])

  const createNewFile = useCallback(() => {
    const id = Math.random().toString(36).substring(7)
    const newFile = {
      id,
      name: `untitled-${id.slice(0, 3)}.ts`,
      content: '',
      language: 'typescript'
    }
    setFiles(prev => [...prev, newFile])
    setActiveFileId(id)
  }, [])

  const openFile = (id: string) => {
    setActiveFileId(id)
  }

  const closeFile = (id: string) => {
    const remaining = files.filter(f => f.id !== id)
    setFiles(remaining)
    if (activeFileId === id) {
      setActiveFileId(remaining.length > 0 ? remaining[0].id : null)
    }
  }

  return {
    files,
    activeFile,
    activeFileId,
    setActiveFileId,
    updateActiveFileContent,
    createNewFile,
    openFile,
    closeFile,
    isTerminalOpen,
    setIsTerminalOpen
  }
}
