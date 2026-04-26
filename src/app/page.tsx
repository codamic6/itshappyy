
"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Send, Sparkles, Terminal, Code2 } from 'lucide-react';

export default function App() {
  const [code, setCode] = useState('// Start coding here...\nfunction helloWorld() {\n  console.log("Hello CARET!");\n}');
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);

  // Mock function to handle AI Chat
  const handleAIChat = () => {
    if (!prompt.trim()) return;

    const userPrompt = prompt;
    setChatHistory(prev => [...prev, { role: 'user', text: userPrompt }]);
    setPrompt('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `/* AI: ${userPrompt} */\n`;
      setCode(prevCode => prevCode + "\n" + aiResponse);
      setChatHistory(prev => [...prev, { role: 'ai', text: `Generated code for: "${userPrompt}" and appended to editor.` }]);
    }, 500);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0D0D0D] text-gray-200 overflow-hidden font-sans">
      {/* 70% Editor Area */}
      <div className="w-[70%] flex flex-col border-r border-gray-800">
        <div className="h-10 bg-[#111] border-b border-gray-800 flex items-center px-4 gap-2">
          <Code2 className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-medium tracking-tight">main.js — Caret Editor</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Source Code Pro', monospace",
              minimap: { enabled: false },
              padding: { top: 16 },
              cursorBlinking: "smooth",
              smoothScrolling: true,
              contextmenu: true,
            }}
          />
        </div>
        <div className="h-8 bg-[#111] border-t border-gray-800 flex items-center px-4 justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><Terminal className="h-3 w-3" /> Terminal</span>
            <span>UTF-8</span>
          </div>
          <div className="text-blue-400/80">JavaScript</div>
        </div>
      </div>

      {/* 30% AI Chat Sidebar */}
      <div className="w-[30%] flex flex-col bg-[#111]">
        <div className="p-4 border-b border-gray-800 flex items-center gap-2 bg-[#151515]">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <h2 className="text-sm font-bold tracking-widest uppercase">AI Assistant</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4 p-6">
              <Sparkles className="h-12 w-12" />
              <p className="text-xs">Ask me to generate functions, explain logic, or build components.</p>
            </div>
          ) : (
            chatHistory.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600/10 border border-blue-500/20 text-blue-100' 
                    : 'bg-gray-800 border border-gray-700 text-gray-300'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-[#151515] border-t border-gray-800">
          <div className="relative group">
            <textarea
              className="w-full bg-[#0D0D0D] border border-gray-700 rounded-lg p-3 pr-12 text-xs focus:outline-none focus:border-purple-500 transition-colors resize-none min-h-[80px]"
              placeholder="Describe what you want to build..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAIChat();
                }
              }}
            />
            <button
              onClick={handleAIChat}
              disabled={!prompt.trim()}
              className="absolute right-3 bottom-3 p-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-30 disabled:hover:bg-purple-600 transition-all shadow-lg"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[9px] text-gray-500 mt-2 text-center italic">Press Enter to generate</p>
        </div>
      </div>
    </div>
  );
}
