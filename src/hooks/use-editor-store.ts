
"use client"

import { useState, useCallback, useMemo } from 'react'

export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  parentId: string | null
  content?: string
  language?: string
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
    { type: 'output', content: 'Caret AI Workspace initialized. Type "help" for commands.' }
  ])
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(13)

  const activeFile = activeFileId ? files[activeFileId] : null
  const openFiles = useMemo(() => openTabs.map(id => files[id]).filter(Boolean), [openTabs, files])

  const createFile = useCallback((name: string, parentId: string | null = null) => {
    const id = Math.random().toString(36).substring(7)
    const ext = name.split('.').pop() || 'ts'
    const languageMap: Record<string, string> = {
      'py': 'python', 'js': 'javascript', 'ts': 'typescript', 
      'html': 'html', 'css': 'css', 'json': 'json', 'md': 'markdown'
    }
    const language = languageMap[ext] || 'typescript'

    const newNode: FileNode = {
      id,
      name,
      type: 'file',
      parentId,
      content: '',
      language,
      isOpen: true
    }

    setFiles(prev => ({ ...prev, [id]: newNode }))
    setOpenTabs(prev => prev.includes(id) ? prev : [...prev, id])
    setActiveFileId(id)
    return id
  }, [])

  const updateFileContent = useCallback((id: string, content: string) => {
    setFiles(prev => ({
      ...prev,
      [id]: { ...prev[id], content }
    }))
  }, [])

  const renameFile = useCallback((id: string, newName: string) => {
    setFiles(prev => ({
      ...prev,
      [id]: { ...prev[id], name: newName }
    }))
  }, [])

  const deleteFile = useCallback((id: string) => {
    setFiles(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    setOpenTabs(prev => prev.filter(tid => tid !== id))
    if (activeFileId === id) setActiveFileId(null)
  }, [activeFileId])

  const closeTab = useCallback((id: string) => {
    setOpenTabs(prev => {
      const newList = prev.filter(tid => tid !== id)
      if (activeFileId === id) {
        setActiveFileId(newList.length > 0 ? newList[newList.length - 1] : null)
      }
      return newList
    })
  }, [activeFileId])

  const selectFile = useCallback((id: string) => {
    setOpenTabs(prev => prev.includes(id) ? prev : [...prev, id])
    setActiveFileId(id)
  }, [])

  const executeCommand = useCallback((input: string) => {
    const cmd = input.trim().toLowerCase()
    const historyEntry: TerminalLine = { type: 'input', content: `caret@workspace:~$ ${input}` }
    let output: TerminalLine | null = null

    if (cmd === 'help') {
      output = { type: 'output', content: 'Available commands: help, clear, date, pwd, echo [text], ls' }
    } else if (cmd === 'clear') {
      setTerminalHistory([])
      return
    } else if (cmd === 'date') {
      output = { type: 'output', content: new Date().toString() }
    } else if (cmd === 'pwd') {
      output = { type: 'output', content: '/home/caret/workspace' }
    } else if (cmd.startsWith('echo ')) {
      output = { type: 'output', content: input.substring(5) }
    } else if (cmd === 'ls') {
      const fileNames = Object.values(files).map(f => f.name).join('  ')
      output = { type: 'output', content: fileNames || '(empty workspace)' }
    } else if (cmd !== '') {
      output = { type: 'error', content: `Command not found: ${cmd.split(' ')[0]}` }
    }

    setTerminalHistory(prev => output ? [...prev, historyEntry, output] : [...prev, historyEntry])
  }, [files])

  return {
    files,
    openTabs,
    activeFileId,
    activeFile,
    openFiles,
    terminalHistory,
    isSidebarOpen,
    isTerminalOpen,
    isAIPanelOpen,
    isSettingsOpen,
    fontSize,
    setIsSidebarOpen,
    setIsTerminalOpen,
    setIsAIPanelOpen,
    setIsSettingsOpen,
    setFontSize,
    createFile,
    updateFileContent,
    renameFile,
    deleteFile,
    closeTab,
    selectFile,
    executeCommand,
    setActiveFileId
  }
}
