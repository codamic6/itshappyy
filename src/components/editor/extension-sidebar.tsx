
"use client"

import { useState, useEffect } from "react"
import { Search, Download, Package, ExternalLink, Loader2, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFirestore, useUser } from "@/firebase"
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore"
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
      toast({ variant: "destructive", title: "Authentication required", description: "Please sign in to install extensions." })
      return
    }

    setInstalling(ext.id)
    try {
      // Mock code for demo - in real scenario we might fetch a manifest or bundle
      const mockCode = `
        caret.showNotification("Extension Installed", "Welcome to ${ext.name}!");
        console.log("Extension ${ext.name} logic initialized.");
      `
      
      const userExtRef = doc(firestore, 'users', user.uid, 'user_extensions', ext.id)
      await setDoc(userExtRef, {
        id: ext.id,
        name: ext.name,
        publisher: ext.publisher,
        description: ext.description,
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
    <div className="flex flex-col h-full bg-[#0D1117]">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Marketplace</span>
          <Package className="h-4 w-4 text-primary/40" />
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground/40" />
          <Input 
            placeholder="Search extensions (Open VSX)" 
            className="pl-8 bg-white/[0.03] border-white/5 h-9 text-xs"
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

      <ScrollArea className="flex-1 px-2 pb-4">
        <div className="space-y-2">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-[10px] text-muted-foreground">Fetching marketplace...</span>
            </div>
          )}
          
          {results.map((ext) => (
            <div key={ext.id} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-all group">
              <div className="flex gap-3">
                {ext.iconUrl ? (
                  <img src={ext.iconUrl} alt={ext.name} className="w-8 h-8 rounded shrink-0 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-[11px] font-bold text-foreground truncate">{ext.name}</h4>
                    <span className="text-[9px] text-muted-foreground/60">v{ext.version}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 line-clamp-2 mt-0.5">{ext.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[9px] font-medium text-primary/60">{ext.publisher}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-[9px] bg-primary/10 hover:bg-primary/20 text-primary"
                      onClick={() => handleInstall(ext)}
                      disabled={installing === ext.id}
                    >
                      {installing === ext.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Install"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-10 text-[10px] text-muted-foreground">No extensions found for "{query}"</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
