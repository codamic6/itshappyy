
"use client"

import { useState, useCallback, useMemo, useEffect } from 'react'

export interface FileNode {
  id: string
  name: string
  content: string
  language: string
  isOpen?: boolean
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
}

export function useEditorStore() {
  const [files, setFiles] = useState<Record<string, FileNode>>({})
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Caret AI Integrated Terminal v1.0.0' }
  ])
  
  const [ui, setUi] = useState({
    sidebarWidth: 250,
    isSidebarOpen: true,
    isTerminalOpen: true,
    isAIPanelOpen: true,
    isCommandPaletteOpen: false,
    fontSize: 14,
    activeView: 'explorer' as 'explorer' | 'search' | 'git' | 'extensions' | 'ai'
  })

  const activeFile = activeFileId ? files[activeFileId] : null
  const openFiles = useMemo(() => openTabs.map(id => files[id]).filter(Boolean), [openTabs, files])

  const createFile = useCallback((name?: string) => {
    const id = Math.random().toString(36).substring(7)
    const finalName = name || `untitled-${Object.keys(files).length + 1}`
    
    const ext = finalName.split('.').pop() || 'js'
    const languageMap: Record<string, string> = {
      'py': 'python', 'js': 'javascript', 'ts': 'typescript', 
      'html': 'html', 'css': 'css', 'json': 'json', 'md': 'markdown'
    }

    const newNode: FileNode = {
      id,
      name: finalName,
      content: '',
      language: languageMap[ext] || 'javascript'
    }

    setFiles(prev => ({ ...prev, [id]: newNode }))
    setOpenTabs(prev => prev.includes(id) ? prev : [...prev, id])
    setActiveFileId(id)
    return id
  }, [files])

  const selectFile = useCallback((id: string) => {
    setOpenTabs(prev => prev.includes(id) ? prev : [...prev, id])
    setActiveFileId(id)
  }, [])

  const closeTab = useCallback((id: string) => {
    setOpenTabs(prev => {
      const newList = prev.filter(tid => tid !== id)
      if (activeFileId === id) {
        setActiveFileId(newList.length > 0 ? newList[newList.length - 1] : null)
      }
      return newList
    })
  }, [activeFileId])

  const updateFileContent = useCallback((id: string, content: string) => {
    setFiles(prev => ({
      ...prev,
      [id]: { ...prev[id], content }
    }))
  }, [])

  const deleteFile = useCallback((id: string) => {
    setFiles(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    closeTab(id)
  }, [closeTab])

  const executeCommand = useCallback((input: string) => {
    const cmd = input.trim().toLowerCase()
    setTerminalHistory(prev => [...prev, { type: 'input', content: input }])
    
    if (cmd === 'clear') {
      setTerminalHistory([])
    } else if (cmd === 'help') {
      setTerminalHistory(prev => [...prev, { type: 'output', content: 'Available commands: help, clear, date, ls, pwd' }])
    } else {
      setTerminalHistory(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}` }])
    }
  }, [])

  // Listen for Command+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setUi(prev => ({ ...prev, isCommandPaletteOpen: !prev.isCommandPaletteOpen }))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    files, openTabs, activeFileId, activeFile, openFiles, terminalHistory, ui,
    setUi, createFile, selectFile, closeTab, updateFileContent, deleteFile, executeCommand
  }
}
