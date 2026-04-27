
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditorStore } from '@/hooks/use-editor-store'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  fontSize: number
  onFontSizeChange: (val: number) => void
}

export function SettingsModal({ isOpen, onClose, fontSize, onFontSizeChange }: SettingsModalProps) {
  const store = useEditorStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-white/5 text-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold uppercase tracking-widest text-primary">Preferences</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label className="text-xs font-medium text-muted-foreground">Editor Theme</Label>
            <Select value={store.ui.theme} onValueChange={store.setTheme}>
              <SelectTrigger className="bg-background border-white/10 text-xs">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10">
                <SelectItem value="vs-dark">VS Dark (Default)</SelectItem>
                <SelectItem value="hc-black">High Contrast Black</SelectItem>
                <SelectItem value="vs-light">VS Light</SelectItem>
                <SelectItem value="monokai">Monokai Pro</SelectItem>
                <SelectItem value="github-light">GitHub Light</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">Editor Font Size ({fontSize}px)</Label>
            </div>
            <Slider 
              value={[fontSize]} 
              min={10} 
              max={24} 
              step={1} 
              onValueChange={(val) => onFontSizeChange(val[0])}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">Auto-Save to Firestore</Label>
              <p className="text-[10px] text-muted-foreground">Automatically sync changes every 2 seconds.</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">Minimap</Label>
              <p className="text-[10px] text-muted-foreground">Show code preview on the right.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
