"use client"

import { useState } from "react"
import { Search, Package, Loader2, Info, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFirestore, useUser } from "@/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"

interface Extension {
  id: string
  name: string
  publisher: string
  description: string
  version: string
  iconUrl?: string
  namespace: string
}

export function ExtensionSidebar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Extension[]>([])
  const [loading, setLoading] = useState(false)
  const [installing, setInstalling] = useState<string | null>(null)
  const firestore = useFirestore()
  const { user } = useUser()
  const { toast } = useToast()

  const searchExtensions = async (q: string) => {
    if (!q) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`https://open-vsx.org/api/-/search?q=${encodeURIComponent(q)}&size=20`)
      const data = await response.json()
      const extensions = data.extensions.map((ext: any) => ({
        id: `${ext.namespace}.${ext.name}`,
        name: ext.name,
        publisher: ext.namespace,
        description: ext.description,
        version: ext.version,
        iconUrl: ext.iconUrl,
        namespace: ext.namespace
      }))
      setResults(extensions)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInstall = async (ext: Extension) => {
    if (!user || !firestore) {
      toast({ variant: "destructive", title: "Authentication required" })
      return
    }

    setInstalling(ext.id)
    try {
      const isTheme = ext.name.toLowerCase().includes('theme') || ext.description.toLowerCase().includes('theme');
      const mockCode = `const vscode = require('vscode'); vscode.window.showInformationMessage("Extension ${ext.name} initialized!");`;
      
      const userExtRef = doc(firestore, 'users', user.uid, 'user_extensions', ext.id)
      await setDoc(userExtRef, {
        id: ext.id,
        name: ext.name,
        publisher: ext.publisher,
        description: ext.description,
        type: isTheme ? 'theme' : 'logic',
        code: mockCode,
        installedAt: serverTimestamp()
      })
      
      toast({ title: "Installed", description: `${ext.name} is now active.` })
    } catch (err) {
      toast({ variant: "destructive", title: "Installation failed" })
    } finally {
      setInstalling(null)
    }
  }

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Marketplace</span>
          <Package className="h-3 w-3 text-white/20" />
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/20" />
          <Input 
            placeholder="SEARCH EXTENSIONS..." 
            className="pl-9 bg-white/[0.02] border-white/5 h-9 text-[10px] font-future focus-visible:ring-0 focus-visible:border-white/20"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              const q = e.target.value
              const timeoutId = setTimeout(() => searchExtensions(q), 500)
              return () => clearTimeout(timeoutId)
            }}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 pb-4">
        <div className="space-y-2">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-2 opacity-40">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-[9px] font-future uppercase">Searching...</span>
            </div>
          )}
          
          {results.map((ext) => (
            <div key={ext.id} className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group">
              <div className="flex gap-3">
                {ext.iconUrl ? (
                  <img src={ext.iconUrl} alt={ext.name} className="w-8 h-8 rounded shrink-0 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0">
                    <Package className="h-4 w-4 text-white/20" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-[10px] font-bold text-white/80 truncate">{ext.name.toUpperCase()}</h4>
                  </div>
                  <p className="text-[9px] text-white/30 line-clamp-2 mt-0.5">{ext.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[8px] font-future text-white/20">{ext.publisher.toUpperCase()}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-[8px] font-bold bg-white/5 hover:bg-white/10 text-white/60"
                      onClick={() => handleInstall(ext)}
                      disabled={installing === ext.id}
                    >
                      {installing === ext.id ? "..." : "INSTALL"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!loading && !query && (
            <div className="text-center py-20 opacity-20">
              <Package className="h-6 w-6 mx-auto mb-2" />
              <p className="text-[9px] font-future px-4 uppercase">Search Open VSX Registry</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}