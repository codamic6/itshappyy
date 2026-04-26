
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
    name: 'welcome.ts',
    content: 'export function welcome() {\n  console.log("Welcome to DevSphere AI!");\n  // Highlight this code and ask for an explanation!\n}',
    language: 'typescript'
  },
  {
    id: '2',
    name: 'styles.css',
    content: 'body {\n  background-color: #1C2528;\n  color: #73D7F7;\n  font-family: "Source Code Pro", monospace;\n}',
    language: 'css'
  }
]

export function useEditorStore() {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES)
  const [activeFileId, setActiveFileId] = useState<string>(INITIAL_FILES[0].id)

  const activeFile = files.find(f => f.id === activeFileId) || files[0]

  const updateActiveFileContent = useCallback((newContent: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: newContent } : f))
  }, [activeFileId])

  const createNewFile = useCallback(() => {
    const id = Math.random().toString(36).substring(7)
    const newFile = {
      id,
      name: `new-file-${id.slice(0, 3)}.ts`,
      content: '',
      language: 'typescript'
    }
    setFiles(prev => [...prev, newFile])
    setActiveFileId(id)
  }, [])

  return {
    files,
    activeFile,
    activeFileId,
    setActiveFileId,
    updateActiveFileContent,
    createNewFile
  }
}
