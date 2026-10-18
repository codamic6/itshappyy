
"use client";

import React, { createContext, useContext, useState } from 'react';

const EditorContext = createContext<any>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({});
  return (
    <EditorContext.Provider value={{ state, setState }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorStore() {
  return useContext(EditorContext);
}
