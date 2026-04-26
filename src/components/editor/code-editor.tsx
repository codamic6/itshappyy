"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { aiCodeAutocompletion } from '@/ai/flows/ai-code-autocompletion'

interface CodeEditorProps {
  content: string
  language: string
  onChange: (content: string) => void
  onSelectionChange: (text: string) => void
}

export function CodeEditor({ content, language, onChange, onSelectionChange }: CodeEditorProps) {
  const [completion, setCompletion] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  // Sync scroll
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  // Handle autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && completion) {
      e.preventDefault()
      const cursor = textareaRef.current?.selectionStart || 0
      const newContent = content.slice(0, cursor) + completion + content.slice(cursor)
      onChange(newContent)
      setCompletion('')
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = cursor + completion.length
        }
      }, 0)
      return
    }

    if (e.key === 'Escape') {
      setCompletion('')
    }
  }

  const handleTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    onChange(newContent)
    setIsTyping(true)
    
    // Trigger AI autocompletion (debounced simulation)
    const cursorPosition = e.target.selectionStart
    if (newContent.length > 0 && cursorPosition > 0) {
      const timer = setTimeout(async () => {
        try {
          const result = await aiCodeAutocompletion({
            code: newContent,
            language,
            cursorPosition
          })
          setCompletion(result.completion)
        } catch (err) {
          console.error("Autocompletion failed", err)
        }
        setIsTyping(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setCompletion('')
      setIsTyping(false)
    }
  }

  const handleSelection = () => {
    if (textareaRef.current) {
      const selection = textareaRef.current.value.substring(
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd
      )
      onSelectionChange(selection)
    }
  }

  return (
    <div className="relative flex-1 bg-[#0D0D0D] overflow-hidden flex flex-col">
      <div className="h-full relative font-code text-[13px] tracking-wide">
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 w-12 h-full border-r border-white/5 bg-black/20 flex flex-col items-center pt-4 text-[10px] text-muted-foreground/40 select-none">
          {Array.from({ length: Math.max(content.split('\n').length + 10, 50) }).map((_, i) => (
            <div key={i} className="h-[22px] leading-[22px]">{i + 1}</div>
          ))}
        </div>

        {/* Syntax Layer */}
        <pre 
          ref={preRef}
          aria-hidden="true"
          className="absolute left-12 top-0 right-0 bottom-0 p-4 m-0 pointer-events-none whitespace-pre overflow-hidden bg-transparent"
        >
          <code className="block text-white/90">
            {content.split('\n').map((line, i) => (
              <span key={i} className="block min-h-[22px] leading-[22px]">
                {line === '' ? ' ' : line.split(/(\W+)/).map((part, j) => {
                  const keywords = ['function', 'export', 'const', 'let', 'var', 'if', 'else', 'return', 'import', 'from', 'class', 'interface', 'type', 'async', 'await']
                  const types = ['string', 'number', 'boolean', 'void', 'any', 'Promise']
                  if (keywords.includes(part)) return <span key={j} className="text-primary font-bold">{part}</span>
                  if (types.includes(part)) return <span key={j} className="text-accent italic">{part}</span>
                  if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) return <span key={j} className="text-green-400 opacity-90">{part}</span>
                  if (/^\d+$/.test(part)) return <span key={j} className="text-orange-400">{part}</span>
                  if (part.startsWith('//')) return <span key={j} className="text-muted-foreground/50 italic">{part}</span>
                  return <span key={j}>{part}</span>
                })}
              </span>
            ))}
          </code>
        </pre>

        {/* Text Input Layer */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          onSelect={handleSelection}
          spellCheck={false}
          autoFocus
          className="absolute left-12 top-0 right-0 bottom-0 p-4 bg-transparent border-none focus:ring-0 resize-none font-code text-[13px] leading-[22px] text-transparent caret-primary overflow-auto z-10"
        />

        {/* Ghost Text Completion */}
        {completion && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#1A1A1A] border border-primary/30 px-3 py-1.5 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 animate-in fade-in zoom-in slide-in-from-bottom-2">
            <span className="text-[10px] font-bold text-primary/80 tracking-widest uppercase">AI Suggestion</span>
            <span className="text-xs text-muted-foreground italic truncate max-w-[200px]">{completion}</span>
            <div className="flex items-center gap-1 ml-2">
              <span className="text-[9px] font-bold bg-muted px-1 rounded">TAB</span>
              <span className="text-[9px] text-muted-foreground">to accept</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}