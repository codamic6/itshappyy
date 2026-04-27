
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
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
      <DialogContent className="bg-[#111] border-white/5 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold uppercase tracking-widest text-primary">Preferences</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
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
              <Label className="text-xs font-medium">AI Ghost Text</Label>
              <p className="text-[10px] text-muted-foreground">Show real-time AI code suggestions as you type.</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">High Contrast Mode</Label>
              <p className="text-[10px] text-muted-foreground">Force deep black background for better focus.</p>
            </div>
            <Switch checked disabled />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">Auto-Save</Label>
              <p className="text-[10px] text-muted-foreground">Automatically persist changes to memory.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
