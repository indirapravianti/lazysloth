import { useState, useCallback } from 'react';
import { Award, Zap, Star } from 'lucide-react';
import { TemplateUploader } from '@/components/TemplateUploader';
import { NamesUploader } from '@/components/NamesUploader';
import { TextCustomizer } from '@/components/TextCustomizer';
import { DateCustomizer } from '@/components/DateCustomizer';
import { QRCustomizer } from '@/components/QRCustomizer';
import { CertificatePreview } from '@/components/CertificatePreview';
import { GenerateSection } from '@/components/GenerateSection';
import type { CertificateConfig, TextSettings, DateSettings, QRSettings } from '@/types/certificate';

const defaultNameSettings: TextSettings = {
  color: '#1a1a1a',
  fontFamily: 'Georgia, serif',
  fontSize: 48,
  x: 400,
  y: 280,
};

const defaultDateSettings: DateSettings = {
  enabled: true,
  format: 'full',
  color: '#4a4a4a',
  fontFamily: 'Georgia, serif',
  fontSize: 18,
  x: 400,
  y: 450,
};

const defaultQRSettings: QRSettings = {
  enabled: true,
  size: 80,
  x: 700,
  y: 480,
};

const Index = () => {
  const [config, setConfig] = useState<CertificateConfig>({
    templateImage: null,
    names: [],
    nameSettings: defaultNameSettings,
    dateSettings: defaultDateSettings,
    qrSettings: defaultQRSettings,
  });

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const updateConfig = <K extends keyof CertificateConfig>(
    key: K,
    value: CertificateConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleCanvasLoad = useCallback((width: number, height: number) => {
    setCanvasSize({ width, height });
    // Auto-center the text positions based on canvas size
    if (!config.templateImage) {
      setConfig((prev) => ({
        ...prev,
        nameSettings: { ...prev.nameSettings, x: width / 2, y: height * 0.45 },
        dateSettings: { ...prev.dateSettings, x: width / 2, y: height * 0.75 },
        qrSettings: { ...prev.qrSettings, x: width * 0.85, y: height * 0.85 },
      }));
    }
  }, [config.templateImage]);

  const handleTemplateChange = (image: string) => {
    updateConfig('templateImage', image);
  };

  const previewName = config.names[0] || 'John Doe';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-quirky-pink via-quirky-purple to-quirky-blue flex items-center justify-center border-2 border-foreground shadow-quirky-sm">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Certify</h1>
                <p className="text-sm text-muted-foreground">Mass certificate magic ✨</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 bg-quirky-yellow px-3 py-1 rounded-full border-2 border-foreground font-medium">
                <Zap className="w-4 h-4" />
                Fast & Free
              </span>
              <span className="inline-flex items-center gap-1 bg-quirky-teal text-secondary-foreground px-3 py-1 rounded-full border-2 border-foreground font-medium">
                <Star className="w-4 h-4" />
                No signup
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Upload Section */}
            <TemplateUploader
              templateImage={config.templateImage}
              onTemplateChange={handleTemplateChange}
            />

            <NamesUploader
              names={config.names}
              onNamesChange={(names) => updateConfig('names', names)}
            />

            {/* Customization Section */}
            {config.templateImage && (
              <div className="quirky-card p-6 space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  🎨 Customize Your Certificates
                </h3>

                <TextCustomizer
                  settings={config.nameSettings}
                  onSettingsChange={(settings) => updateConfig('nameSettings', settings)}
                  canvasWidth={canvasSize.width}
                  canvasHeight={canvasSize.height}
                  label="Name Text"
                  colorAccent="bg-quirky-pink"
                />

                <div className="border-t-2 border-dashed border-muted pt-6">
                  <DateCustomizer
                    settings={config.dateSettings}
                    onSettingsChange={(settings) => updateConfig('dateSettings', settings)}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                  />
                </div>

                <div className="border-t-2 border-dashed border-muted pt-6">
                  <QRCustomizer
                    settings={config.qrSettings}
                    onSettingsChange={(settings) => updateConfig('qrSettings', settings)}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview & Generate */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-6 space-y-6">
              <CertificatePreview
                config={config}
                previewName={previewName}
                onCanvasLoad={handleCanvasLoad}
              />

              <GenerateSection config={config} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-card mt-auto">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Made with 💖 for certificate enthusiasts everywhere</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-quirky-teal animate-pulse" />
                100% browser-based
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-quirky-pink animate-pulse" />
                No data uploaded
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
