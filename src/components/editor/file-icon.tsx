
"use client"

import { FileCode, FileJson, FileText, Code, Palette, Database, Terminal, FileCode2, Braces, Layers, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileIconProps {
  fileName: string
  className?: string
}

export function FileIcon({ fileName, className }: FileIconProps) {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''

  switch (ext) {
    case 'js':
    case 'jsx':
      return <FileCode className={cn("text-yellow-400", className)} />
    case 'ts':
    case 'tsx':
      return <FileCode2 className={cn("text-blue-400", className)} />
    case 'html':
      return <Code className={cn("text-orange-500", className)} />
    case 'css':
    case 'scss':
      return <Palette className={cn("text-blue-500", className)} />
    case 'json':
      return <Braces className={cn("text-yellow-300", className)} />
    case 'py':
      return <FileCode className={cn("text-blue-300", className)} />
    case 'md':
      return <FileText className={cn("text-gray-400", className)} />
    case 'sql':
      return <Database className={cn("text-pink-400", className)} />
    case 'sh':
    case 'bash':
      return <Terminal className={cn("text-green-400", className)} />
    case 'yaml':
    case 'yml':
      return <Layers className={cn("text-purple-400", className)} />
    case 'cpp':
    case 'c':
      return <Hash className={cn("text-blue-600", className)} />
    default:
      return <FileCode className={cn("text-muted-foreground/60", className)} />
  }
}
