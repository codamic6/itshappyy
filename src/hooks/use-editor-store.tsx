
"use client"

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'

export interface FileNode {
  id: string
  name: string
  content: string
  language: string
  path: string
  parentId: string | null
  type: 'file' | 'folder'
  updatedAt: number
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
  const [nodes, setNodes] = useState<Record<string, FileNode>>({})
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [recentlyOpened, setRecentlyOpened] = useState<string[]>([])
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Caret Shell Environment v1.0.0' },
    { type: 'output', content: 'Status: System Online. AI Ready.' }
  ])
  
  const [ui, setUi] = useState({
    sidebarWidth: 280,
    isSidebarOpen: true,
    isTerminalOpen: false,
    isAIPanelOpen: true,
    isCommandPaletteOpen: false,
    isSettingsOpen: false,
    isShortcutsOpen: false,
    fontSize: 14,
    theme: 'vs-dark',
    activeView: 'explorer' as 'explorer' | 'search' | 'git' | 'extensions' | 'ai'
  })

  const files = useMemo(() => {
    return Object.fromEntries(Object.entries(nodes).filter(([_, node]) => node.type === 'file'))
  }, [nodes])

  const activeFile = useMemo(() => activeFileId ? nodes[activeFileId] : null, [activeFileId, nodes])
  const openFiles = useMemo(() => openTabs.map(id => nodes[id]).filter(Boolean), [openTabs, nodes])

  const toggleFolder = useCallback((id: string) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const selectFile = useCallback((id: string) => {
    const node = nodes[id]
    if (!node) return
    
    setSelectedNodeId(id)
    if (node.type === 'file') {
      setActiveFileId(id)
      setOpenTabs(prev => {
        if (prev.includes(id)) return prev
        return [...prev, id]
      })
      setRecentlyOpened(prev => {
        const filtered = prev.filter(rid => rid !== id)
        return [id, ...filtered].slice(0, 5)
      })
    } else {
      toggleFolder(id)
    }
  }, [nodes, toggleFolder])

  const createNode = useCallback((name: string, type: 'file' | 'folder' = 'file', parentId: string | null = null, content: string = '') => {
    const id = Math.random().toString(36).substring(7)
    const language = type === 'file' ? detectLanguage(name) : ''
    
    const parent = parentId ? nodes[parentId] : null
    const path = parent ? `${parent.path}/${name}` : `/${name}`

    const newNode: FileNode = {
      id,
      name,
      content,
      language,
      path,
      parentId,
      type,
      updatedAt: Date.now()
    }

    setNodes(prev => ({ ...prev, [id]: newNode }))
    
    if (parentId) {
      setExpandedFolders(prev => ({ ...prev, [parentId]: true }))
    }

    if (type === 'file') {
      setOpenTabs(prev => {
        if (prev.includes(id)) return prev
        return [...prev, id]
      })
      setActiveFileId(id)
      setSelectedNodeId(id)
    }
    return id
  }, [nodes])

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
    setNodes(prev => {
      if (!prev[id] || prev[id].type !== 'file') return prev
      return {
        ...prev,
        [id]: { ...prev[id], content, updatedAt: Date.now() }
      }
    })
  }, [])

  const deleteNode = useCallback((id: string) => {
    setNodes(prev => {
      const next = { ...prev }
      const toDelete = [id]
      const findChildren = (pid: string) => {
        Object.values(prev).forEach(node => {
          if (node.parentId === pid) {
            toDelete.push(node.id)
            findChildren(node.id)
          }
        })
      }
      findChildren(id)
      toDelete.forEach(tid => delete next[tid])
      return next
    })
    
    setOpenTabs(prev => prev.filter(tid => tid !== id))
    setRecentlyOpened(prev => prev.filter(rid => rid !== id))
    if (activeFileId === id) setActiveFileId(null)
    if (selectedNodeId === id) setSelectedNodeId(null)
  }, [activeFileId, selectedNodeId])

  const renameNode = useCallback((id: string, newName: string) => {
    setNodes(prev => {
      if (!prev[id]) return prev
      const language = prev[id].type === 'file' ? detectLanguage(newName) : ''
      return {
        ...prev,
        [id]: { ...prev[id], name: newName, language }
      }
    })
  }, [])

  const setTheme = (theme: string) => setUi(prev => ({ ...prev, theme }))

  const executeCommand = useCallback((input: string) => {
    const cmd = input.trim()
    if (!cmd) return
    setTerminalHistory(prev => [...prev, { type: 'input', content: input }])
    const parts = cmd.toLowerCase().split(' ')
    const baseCmd = parts[0]

    switch (baseCmd) {
      case 'clear': setTerminalHistory([]); break
      case 'help': setTerminalHistory(prev => [...prev, { type: 'output', content: 'Available: help, clear, date, pwd, ls' }]); break
      case 'ls':
        const names = Object.values(nodes).filter(n => !n.parentId).map(f => f.name).join('  ')
        setTerminalHistory(prev => [...prev, { type: 'output', content: names || '(empty workspace)' }])
        break
      default: setTerminalHistory(prev => [...prev, { type: 'error', content: `caret-sh: command not found: ${baseCmd}` }])
    }
  }, [nodes])

  const value = {
    nodes, files, openTabs, activeFileId, activeFile, openFiles, terminalHistory, ui,
    selectedNodeId, setSelectedNodeId, expandedFolders, recentlyOpened,
    setUi, createNode, selectFile, closeTab, updateFileContent, deleteNode, renameNode, executeCommand, toggleFolder, setTheme,
    setIsSidebarOpen: (val: boolean) => setUi(prev => ({ ...prev, isSidebarOpen: val })),
    setIsTerminalOpen: (val: boolean) => setUi(prev => ({ ...prev, isTerminalOpen: val })),
    setIsAIPanelOpen: (val: boolean) => setUi(prev => ({ ...prev, isAIPanelOpen: val })),
    setIsCommandPaletteOpen: (val: boolean) => setUi(prev => ({ ...prev, isCommandPaletteOpen: val })),
    setIsSettingsOpen: (val: boolean) => setUi(prev => ({ ...prev, isSettingsOpen: val })),
    setIsShortcutsOpen: (val: boolean) => setUi(prev => ({ ...prev, isShortcutsOpen: val })),
    setFontSize: (val: number) => setUi(prev => ({ ...prev, fontSize: val })),
    setActiveView: (view: any) => setUi(prev => ({ ...prev, activeView: view }))
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditorStore() {
  const context = useContext(EditorContext)
  if (!context) throw new Error('useEditorStore must be used within an EditorProvider')
  return context
}
