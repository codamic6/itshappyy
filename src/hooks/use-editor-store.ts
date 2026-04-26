"use client"

import { useState, useCallback } from 'react'

export interface FileItem {
  id: string
  name: string
  content: string
  language: string
  isOpen?: boolean
}

// Strictly empty initial state for a professional feel
const INITIAL_FILES: FileItem[] = []

export function useEditorStore() {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES)
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const activeFile = files.find(f => f.id === activeFileId) || null
  const openFiles = files.filter(f => f.isOpen)

  const updateActiveFileContent = useCallback((newContent: string) => {
    if (!activeFileId) return
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: newContent } : f))
  }, [activeFileId])

  const selectFile = useCallback((id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, isOpen: true } : f))
    setActiveFileId(id)
  }, [])

  const createNewFile = useCallback(() => {
    const id = Math.random().toString(36).substring(7)
    const newFile: FileItem = {
      id,
      name: `untitled-${id.slice(0, 3)}.ts`,
      content: '',
      language: 'typescript',
      isOpen: true
    }
    setFiles(prev => [...prev, newFile])
    setActiveFileId(id)
  }, [])

  const closeFile = useCallback((id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, isOpen: false } : f))
    if (activeFileId === id) {
      const remainingOpen = files.filter(f => f.id !== id && f.isOpen)
      setActiveFileId(remainingOpen.length > 0 ? remainingOpen[0].id : null)
    }
  }, [activeFileId, files])

  const deleteFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    if (activeFileId === id) {
      setActiveFileId(null)
    }
  }, [activeFileId])

  return {
    files,
    activeFile,
    activeFileId,
    openFiles,
    setActiveFileId: selectFile,
    updateActiveFileContent,
    createNewFile,
    closeFile,
    deleteFile,
    isTerminalOpen,
    setIsTerminalOpen,
    isSidebarOpen,
    setIsSidebarOpen
  }
}
