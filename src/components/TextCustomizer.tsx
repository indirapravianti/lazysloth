import { Type, Palette, Move } from 'lucide-react';
import type { TextSettings } from '@/types/certificate';
import { FONT_OPTIONS } from '@/types/certificate';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TextCustomizerProps {
  settings: TextSettings;
  onSettingsChange: (settings: TextSettings) => void;
  canvasWidth: number;
  canvasHeight: number;
  label: string;
  colorAccent: string;
}

export function TextCustomizer({
  settings,
  onSettingsChange,
  canvasWidth,
  canvasHeight,
  label,
  colorAccent,
}: TextCustomizerProps) {
  const updateSetting = <K extends keyof TextSettings>(key: K, value: TextSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5">
        {/* Font Family */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Type className="w-4 h-4" /> Font Style
          </label>
          <Select
            value={settings.fontFamily}
            onValueChange={(value) => updateSetting('fontFamily', value)}
          >
            <SelectTrigger className="quirky-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_OPTIONS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Font Size: {settings.fontSize}px
          </label>
          <Slider
            value={[settings.fontSize]}
            onValueChange={([value]) => updateSetting('fontSize', value)}
            min={12}
            max={120}
            step={2}
            className="w-full"
          />
        </div>

        {/* Color */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" /> Text Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.color}
              onChange={(e) => updateSetting('color', e.target.value)}
              className="w-12 h-10 rounded-lg border-2 border-foreground cursor-pointer"
            />
            <input
              type="text"
              value={settings.color}
              onChange={(e) => updateSetting('color', e.target.value)}
              className="quirky-input flex-1 text-sm font-mono"
            />
          </div>
        </div>

        {/* Position */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Move className="w-4 h-4" /> Position
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground">X: {Math.round(settings.x)}</span>
              <Slider
                value={[settings.x]}
                onValueChange={([value]) => updateSetting('x', value)}
                min={0}
                max={canvasWidth}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground">Y: {Math.round(settings.y)}</span>
              <Slider
                value={[settings.y]}
                onValueChange={([value]) => updateSetting('y', value)}
                min={0}
                max={canvasHeight}
                step={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
