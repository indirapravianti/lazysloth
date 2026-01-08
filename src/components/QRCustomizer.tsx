import { QrCode, Move } from 'lucide-react';
import type { QRSettings } from '@/types/certificate';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface QRCustomizerProps {
  settings: QRSettings;
  onSettingsChange: (settings: QRSettings) => void;
  canvasWidth: number;
  canvasHeight: number;
}

export function QRCustomizer({
  settings,
  onSettingsChange,
  canvasWidth,
  canvasHeight,
}: QRCustomizerProps) {
  const updateSetting = <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-quirky-blue flex items-center justify-center border-2 border-foreground">
            <QrCode className="w-4 h-4 text-primary-foreground" />
          </div>
          <h4 className="font-bold">QR Code</h4>
        </div>
        <Switch
          checked={settings.enabled}
          onCheckedChange={(checked) => updateSetting('enabled', checked)}
        />
      </div>

      {settings.enabled && (
        <div className="grid gap-5 pl-11">
          <p className="text-sm text-muted-foreground">
            Each certificate gets a unique QR code for verification.
          </p>

          {/* Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Size: {settings.size}px
            </label>
            <Slider
              value={[settings.size]}
              onValueChange={([value]) => updateSetting('size', value)}
              min={50}
              max={200}
              step={10}
            />
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
