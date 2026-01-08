import { Calendar, Move, Palette } from 'lucide-react';
import type { DateSettings } from '@/types/certificate';
import { FONT_OPTIONS, DATE_FORMAT_OPTIONS } from '@/types/certificate';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DateCustomizerProps {
  settings: DateSettings;
  onSettingsChange: (settings: DateSettings) => void;
  canvasWidth: number;
  canvasHeight: number;
}

export function DateCustomizer({
  settings,
  onSettingsChange,
  canvasWidth,
  canvasHeight,
}: DateCustomizerProps) {
  const updateSetting = <K extends keyof DateSettings>(key: K, value: DateSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-quirky-purple flex items-center justify-center border-2 border-foreground">
            <Calendar className="w-4 h-4 text-primary-foreground" />
          </div>
          <h4 className="font-bold">Date</h4>
        </div>
        <Switch
          checked={settings.enabled}
          onCheckedChange={(checked) => updateSetting('enabled', checked)}
        />
      </div>

      {settings.enabled && (
        <div className="grid gap-5 pl-11">
          {/* Date Format */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Format</label>
            <Select
              value={settings.format}
              onValueChange={(value) => updateSetting('format', value)}
            >
              <SelectTrigger className="quirky-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DATE_FORMAT_OPTIONS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Font Style</label>
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
              min={10}
              max={60}
              step={1}
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
      )}
    </div>
  );
}
