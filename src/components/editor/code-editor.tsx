
"use client"

import { useState, useRef, useEffect } from 'react'
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

  // Sync scroll between textarea and syntax highlight layer
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  // Handle autocomplete as user types
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && completion) {
      e.preventDefault()
      const cursor = textareaRef.current?.selectionStart || 0
      const newContent = content.slice(0, cursor) + completion + content.slice(cursor)
      onChange(newContent)
      setCompletion('')
      
      // Move cursor to end of completion
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
    
    // Trigger AI autocompletion after a small delay
    const cursorPosition = e.target.selectionStart
    if (newContent.length > 0 && cursorPosition > 0) {
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
    } else {
      setCompletion('')
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

  // Effect to clear completion if cursor moves or text becomes empty
  useEffect(() => {
    if (!content) setCompletion('')
  }, [content])

  return (
    <div className="relative flex-1 bg-background overflow-hidden flex flex-col">
      <div className="h-full relative font-code text-sm">
        {/* Line Numbers - Decorative for IDE feel */}
        <div className="absolute left-0 top-0 w-12 h-full border-r bg-muted/10 flex flex-col items-center pt-4 text-[10px] text-muted-foreground select-none">
          {Array.from({ length: content.split('\n').length + 5 }).map((_, i) => (
            <div key={i} className="h-[21px] leading-[21px]">{i + 1}</div>
          ))}
        </div>

        {/* Highlight Layer (simplistic) */}
        <pre 
          ref={preRef}
          aria-hidden="true"
          className="absolute left-12 top-0 right-0 bottom-0 p-4 m-0 pointer-events-none whitespace-pre overflow-hidden bg-transparent"
        >
          <code className="block">
            {/* Very primitive syntax highlighting simulation */}
            {content.split('\n').map((line, i) => (
              <span key={i} className="block min-h-[21px] leading-[21px]">
                {line.split(/(\W+)/).map((part, j) => {
                  const keywords = ['function', 'export', 'const', 'let', 'var', 'if', 'return', 'import', 'from', 'class', 'public', 'private']
                  const operators = ['=', '=>', '>', '<', '+', '-', '*', '/']
                  if (keywords.includes(part)) return <span key={j} className="text-primary font-bold">{part}</span>
                  if (operators.includes(part)) return <span key={j} className="text-accent">{part}</span>
                  if (part.startsWith('"') || part.startsWith("'")) return <span key={j} className="text-green-400 opacity-90">{part}</span>
                  if (/^\d+$/.test(part)) return <span key={j} className="text-orange-400">{part}</span>
                  if (part.startsWith('//')) return <span key={j} className="text-muted-foreground italic">{part}</span>
                  return <span key={j}>{part}</span>
                })}
              </span>
            ))}
          </code>
        </pre>

        {/* Edit Layer */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          onSelect={handleSelection}
          spellCheck={false}
          className="absolute left-12 top-0 right-0 bottom-0 p-4 bg-transparent border-none focus:ring-0 resize-none font-code text-sm leading-[21px] text-transparent caret-primary overflow-auto z-10"
        />

        {/* Autocomplete Suggestion Hint */}
        {completion && textareaRef.current && (
          <div 
            className="absolute pointer-events-none text-muted-foreground/40 italic z-0 whitespace-pre"
            style={{
               left: `calc(3rem + 1rem + ${textareaRef.current.selectionStart % (textareaRef.current.value.split('\n')[0].length || 1) * 8}px)`,
               top: `calc(1rem + ${Math.floor(textareaRef.current.selectionStart / (textareaRef.current.value.split('\n')[0].length || 1)) * 21}px)`
            }}
          >
            {/* Note: In a real app we would use a more robust way to position the hint based on exact character coordinates */}
          </div>
        )}
        
        {/* Status indicator for completion */}
        {completion && (
          <div className="absolute bottom-4 right-4 bg-accent/90 text-accent-foreground text-[10px] px-2 py-1 rounded shadow-lg animate-pulse z-20">
            Tab to complete: <span className="font-bold">{completion.slice(0, 15)}{completion.length > 15 && '...'}</span>
          </div>
        )}
      </div>
    </div>
  )
}
