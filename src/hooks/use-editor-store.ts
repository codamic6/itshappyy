
"use client"

import { useState, useCallback } from 'react'

export interface FileItem {
  id: string
  name: string
  content: string
  language: string
  isOpen?: boolean
}

export function useEditorStore() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true)

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

  const createNewFile = useCallback((name: string) => {
    if (!name) return
    if (files.some(f => f.name === name)) {
      alert("A file with this name already exists.")
      return
    }

    const id = Math.random().toString(36).substring(7)
    const ext = name.split('.').pop() || 'ts'
    const language = ext === 'py' ? 'python' : ext === 'html' ? 'html' : ext === 'css' ? 'css' : 'typescript'
    
    const newFile: FileItem = {
      id,
      name,
      content: '',
      language,
      isOpen: true
    }
    setFiles(prev => [...prev, newFile])
    setActiveFileId(id)
  }, [files])

  const renameFile = useCallback((id: string, newName: string) => {
    if (!newName) return
    setFiles(prev => prev.map(f => f.id === id ? { ...f, name: newName } : f))
  }, [])

  const closeFile = useCallback((id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, isOpen: false } : f))
    if (activeFileId === id) {
      const remainingOpen = files.filter(f => f.id !== id && f.isOpen)
      setActiveFileId(remainingOpen.length > 0 ? remainingOpen[0].id : null)
    }
  }, [activeFileId, files])

  const deleteFile = useCallback((id: string) => {
    const file = files.find(f => f.id === id)
    if (!file) return
    if (confirm(`Are you sure you want to delete ${file.name}?`)) {
      setFiles(prev => prev.filter(f => f.id !== id))
      if (activeFileId === id) {
        setActiveFileId(null)
      }
    }
  }, [activeFileId, files])

  return {
    files,
    activeFile,
    activeFileId,
    openFiles,
    setActiveFileId: selectFile,
    updateActiveFileContent,
    createNewFile,
    renameFile,
    closeFile,
    deleteFile,
    isTerminalOpen,
    setIsTerminalOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isAIPanelOpen,
    setIsAIPanelOpen
  }
}
