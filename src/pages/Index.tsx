import { useState, useCallback } from 'react';
import { Award, Zap, Star, Users, ImageIcon, Type, QrCode, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { TemplateUploader } from '@/components/TemplateUploader';
import { NamesUploader } from '@/components/NamesUploader';
import { TextCustomizer } from '@/components/TextCustomizer';
import { DateCustomizer } from '@/components/DateCustomizer';
import { QRCustomizer } from '@/components/QRCustomizer';
import { CertificatePreview } from '@/components/CertificatePreview';
import { GenerateSection } from '@/components/GenerateSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
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
  const [zoom, setZoom] = useState(100);

  const updateConfig = <K extends keyof CertificateConfig>(
    key: K,
    value: CertificateConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleCanvasLoad = useCallback((width: number, height: number) => {
    setCanvasSize({ width, height });
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quirky-pink via-quirky-purple to-quirky-blue flex items-center justify-center border-2 border-foreground shadow-quirky-sm">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Certify</h1>
                <p className="text-xs text-muted-foreground">Mass certificate magic ✨</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 bg-quirky-yellow px-3 py-1 rounded-full border-2 border-foreground font-medium text-xs">
                <Zap className="w-3 h-3" />
                Fast & Free
              </span>
              <span className="inline-flex items-center gap-1 bg-quirky-teal text-secondary-foreground px-3 py-1 rounded-full border-2 border-foreground font-medium text-xs">
                <Star className="w-3 h-3" />
                No signup
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Canva-style layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <aside className="w-80 border-r-2 border-foreground bg-card shrink-0 flex flex-col">
          <Tabs defaultValue="template" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-5 gap-1 p-2 bg-muted/50 rounded-none border-b-2 border-foreground shrink-0">
              <TabsTrigger value="template" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-pink data-[state=active]:text-accent-foreground rounded-lg">
                <ImageIcon className="w-4 h-4" />
                <span className="text-[10px] font-medium">Template</span>
              </TabsTrigger>
              <TabsTrigger value="names" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-teal data-[state=active]:text-secondary-foreground rounded-lg">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-medium">Names</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-yellow data-[state=active]:text-accent-foreground rounded-lg">
                <Type className="w-4 h-4" />
                <span className="text-[10px] font-medium">Text</span>
              </TabsTrigger>
              <TabsTrigger value="extras" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-purple data-[state=active]:text-primary-foreground rounded-lg">
                <QrCode className="w-4 h-4" />
                <span className="text-[10px] font-medium">Extras</span>
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-blue data-[state=active]:text-primary-foreground rounded-lg">
                <Download className="w-4 h-4" />
                <span className="text-[10px] font-medium">Export</span>
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-5">
                <TabsContent value="template" className="mt-0">
                  <TemplateUploader
                    templateImage={config.templateImage}
                    onTemplateChange={handleTemplateChange}
                  />
                </TabsContent>

                <TabsContent value="names" className="mt-0">
                  <NamesUploader
                    names={config.names}
                    onNamesChange={(names) => updateConfig('names', names)}
                  />
                </TabsContent>

                <TabsContent value="text" className="mt-0 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-quirky-yellow flex items-center justify-center border-2 border-foreground">
                      <Type className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold">Name Text Settings</h3>
                  </div>
                  <TextCustomizer
                    settings={config.nameSettings}
                    onSettingsChange={(settings) => updateConfig('nameSettings', settings)}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                    label="Name"
                    colorAccent="bg-quirky-pink"
                  />
                </TabsContent>

                <TabsContent value="extras" className="mt-0 space-y-6">
                  <DateCustomizer
                    settings={config.dateSettings}
                    onSettingsChange={(settings) => updateConfig('dateSettings', settings)}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                  />
                  
                  <div className="border-t border-border/50 pt-6">
                    <QRCustomizer
                      settings={config.qrSettings}
                      onSettingsChange={(settings) => updateConfig('qrSettings', settings)}
                      canvasWidth={canvasSize.width}
                      canvasHeight={canvasSize.height}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="generate" className="mt-0">
                  <GenerateSection config={config} />
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Center - Preview Canvas */}
        <main className="flex-1 bg-muted/30 flex flex-col overflow-hidden">
          {/* Zoom Controls */}
          <div className="flex items-center justify-center gap-2 p-3 border-b border-border bg-background/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(25, zoom - 25))}
              disabled={zoom <= 25}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              disabled={zoom >= 200}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Preview Area */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-6">
            <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}>
              <CertificatePreview
                config={config}
                previewName={previewName}
                onCanvasLoad={handleCanvasLoad}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
