
"use client"

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

export interface FileNode {
  id: string
  name: string
  content: string
  language: string
  path: string
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
}

export const detectLanguage = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  const map: Record<string, string> = {
    'py': 'python',
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'json': 'json',
    'md': 'markdown',
    'cpp': 'cpp',
    'c': 'c',
    'go': 'go',
    'rs': 'rust',
    'java': 'java',
    'php': 'php',
    'sql': 'sql',
    'sh': 'shell',
    'yaml': 'yaml',
    'yml': 'yaml',
    'xml': 'xml',
    'rb': 'ruby',
    'swift': 'swift'
  }
  return map[ext] || 'plaintext'
}

const EditorContext = createContext<any>(null)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<Record<string, FileNode>>({})
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Caret Shell Environment v1.0.0' },
    { type: 'output', content: 'Status: System Online. AI Ready.' }
  ])
  
  const [ui, setUi] = useState({
    sidebarWidth: 260,
    isSidebarOpen: true,
    isTerminalOpen: false,
    isAIPanelOpen: true,
    isCommandPaletteOpen: false,
    isSettingsOpen: false,
    fontSize: 14,
    activeView: 'explorer' as 'explorer' | 'search' | 'git' | 'extensions' | 'ai'
  })

  const activeFile = useMemo(() => activeFileId ? files[activeFileId] : null, [activeFileId, files])
  const openFiles = useMemo(() => openTabs.map(id => files[id]).filter(Boolean), [openTabs, files])

  const selectFile = useCallback((id: string) => {
    setActiveFileId(id)
    setOpenTabs(prev => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
  }, [])

  const createFile = useCallback((name: string, content: string = '') => {
    const id = Math.random().toString(36).substring(7)
    const language = detectLanguage(name)
    const newNode: FileNode = {
      id,
      name,
      content,
      language,
      path: `/${name}`
    }

    setFiles(prev => ({ ...prev, [id]: newNode }))
    setOpenTabs(prev => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
    setActiveFileId(id)
    return id
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
    setFiles(prev => {
      if (!prev[id]) return prev
      return {
        ...prev,
        [id]: { ...prev[id], content }
      }
    })
  }, [])

  const deleteFile = useCallback((id: string) => {
    setFiles(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    closeTab(id)
  }, [closeTab])

  const renameFile = useCallback((id: string, newName: string) => {
    setFiles(prev => {
      if (!prev[id]) return prev
      const language = detectLanguage(newName)
      return {
        ...prev,
        [id]: { ...prev[id], name: newName, language }
      }
    })
  }, [])

  const executeCommand = useCallback((input: string) => {
    const cmd = input.trim()
    if (!cmd) return
    
    setTerminalHistory(prev => [...prev, { type: 'input', content: input }])
    
    const parts = cmd.toLowerCase().split(' ')
    const baseCmd = parts[0]

    switch (baseCmd) {
      case 'clear':
        setTerminalHistory([])
        break
      case 'help':
        setTerminalHistory(prev => [...prev, { type: 'output', content: 'Available: help, clear, date, pwd, ls, echo [text]' }])
        break
      case 'ls':
        const fileNames = Object.values(files).map((f: any) => f.name).join('  ')
        setTerminalHistory(prev => [...prev, { type: 'output', content: fileNames || '(empty workspace)' }])
        break
      case 'pwd':
        setTerminalHistory(prev => [...prev, { type: 'output', content: '/home/caret/workspace' }])
        break
      case 'date':
        setTerminalHistory(prev => [...prev, { type: 'output', content: new Date().toLocaleString() }])
        break
      default:
        setTerminalHistory(prev => [...prev, { type: 'error', content: `caret-sh: command not found: ${baseCmd}` }])
    }
  }, [files])

  const setIsSidebarOpen = (val: boolean) => setUi(prev => ({ ...prev, isSidebarOpen: val }))
  const setIsTerminalOpen = (val: boolean) => setUi(prev => ({ ...prev, isTerminalOpen: val }))
  const setIsAIPanelOpen = (val: boolean) => setUi(prev => ({ ...prev, isAIPanelOpen: val }))
  const setIsSettingsOpen = (val: boolean) => setUi(prev => ({ ...prev, isSettingsOpen: val }))
  const setFontSize = (val: number) => setUi(prev => ({ ...prev, fontSize: val }))

  const value = {
    files, openTabs, activeFileId, activeFile, openFiles, terminalHistory, ui,
    setUi, createFile, selectFile, closeTab, updateFileContent, deleteFile, renameFile, executeCommand,
    setIsSidebarOpen, setIsTerminalOpen, setIsAIPanelOpen, setIsSettingsOpen, setFontSize
  }

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditorStore() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditorStore must be used within an EditorProvider')
  }
  return context
}
