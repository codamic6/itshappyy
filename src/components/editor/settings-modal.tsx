
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  fontSize: number
  onFontSizeChange: (val: number) => void
}

export function SettingsModal({ isOpen, onClose, fontSize, onFontSizeChange }: SettingsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-white/5 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold uppercase tracking-widest text-primary">Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
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
              <p className="text-[10px] text-muted-foreground">Show real-time AI code suggestions.</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">Dark Mode</Label>
              <p className="text-[10px] text-muted-foreground">Force high-contrast deep black theme.</p>
            </div>
            <Switch checked disabled />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
