import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, ImageIcon, Type, QrCode, Download, ZoomIn, ZoomOut, ArrowLeft, Plus, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useTemplates } from '@/hooks/useTemplates';
import { TemplateUploader } from '@/components/TemplateUploader';
import { TextCustomizer } from '@/components/TextCustomizer';
import { DateCustomizer } from '@/components/DateCustomizer';
import { QRCustomizer } from '@/components/QRCustomizer';
import { CertificatePreview } from '@/components/CertificatePreview';
import type { CertificateConfig, TextSettings, DateSettings, QRSettings } from '@/types/certificate';

// Convert new template structure to legacy config for preview
function templateToConfig(
  backgroundImage: string | null,
  nameSettings: TextSettings,
  dateSettings: DateSettings,
  qrSettings: QRSettings,
  names: string[]
): CertificateConfig {
  return {
    templateImage: backgroundImage,
    names,
    nameSettings,
    dateSettings,
    qrSettings,
  };
}

export default function TemplateEditor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { getTemplate, updateTemplate, isLoading } = useTemplates();
  
  const template = getTemplate(templateId || '');
  
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [nameSettings, setNameSettings] = useState<TextSettings>({
    color: '#1a1a1a',
    fontFamily: 'Georgia, serif',
    fontSize: 48,
    x: 400,
    y: 280,
  });
  const [dateSettings, setDateSettings] = useState<DateSettings>({
    enabled: true,
    format: 'full',
    color: '#4a4a4a',
    fontFamily: 'Georgia, serif',
    fontSize: 18,
    x: 400,
    y: 450,
  });
  const [qrSettings, setQrSettings] = useState<QRSettings>({
    enabled: false,
    size: 80,
    x: 700,
    y: 480,
  });
  
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(100);

  // Load template data
  useEffect(() => {
    if (template) {
      setBackgroundImage(template.backgroundImage);
      // Initialize positions from template canvas
      const nameField = template.fields.find((f) => f.id === 'name');
      if (nameField) {
        setNameSettings({
          color: nameField.style.color || '#1a1a1a',
          fontFamily: nameField.style.fontFamily || 'Georgia, serif',
          fontSize: nameField.style.fontSize || 48,
          x: nameField.position.x,
          y: nameField.position.y,
        });
      }
    }
  }, [template]);

  // Auto-save template changes
  useEffect(() => {
    if (!template || isLoading) return;
    
    const timeout = setTimeout(() => {
      updateTemplate(template.id, {
        backgroundImage,
        fields: template.fields.map((field) => {
          if (field.id === 'name') {
            return {
              ...field,
              position: { x: nameSettings.x, y: nameSettings.y },
              style: {
                ...field.style,
                color: nameSettings.color,
                fontFamily: nameSettings.fontFamily,
                fontSize: nameSettings.fontSize,
              },
            };
          }
          return field;
        }),
      });
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [backgroundImage, nameSettings, template, updateTemplate, isLoading]);

  const handleCanvasLoad = useCallback((width: number, height: number) => {
    setCanvasSize({ width, height });
    if (!backgroundImage) {
      setNameSettings((prev) => ({ ...prev, x: width / 2, y: height * 0.45 }));
      setDateSettings((prev) => ({ ...prev, x: width / 2, y: height * 0.75 }));
      setQrSettings((prev) => ({ ...prev, x: width * 0.85, y: height * 0.85 }));
    }
  }, [backgroundImage]);

  const config = templateToConfig(backgroundImage, nameSettings, dateSettings, qrSettings, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Template not found</p>
        <Link to="/dashboard/templates">
          <Button variant="outline">Back to Templates</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard/templates">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold tracking-tight">{template.name}</h1>
                <p className="text-xs text-muted-foreground">Editing template</p>
              </div>
            </div>
            <Link to={`/dashboard/generate?template=${template.id}`}>
              <Button size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Generate Assets
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 border-r-2 border-foreground bg-card shrink-0 flex flex-col">
          <Tabs defaultValue="template" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-4 gap-1 p-2 bg-muted/50 rounded-none border-b-2 border-foreground shrink-0">
              <TabsTrigger value="template" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-pink data-[state=active]:text-accent-foreground rounded-lg">
                <ImageIcon className="w-4 h-4" />
                <span className="text-[10px] font-medium">Template</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-yellow data-[state=active]:text-accent-foreground rounded-lg">
                <Type className="w-4 h-4" />
                <span className="text-[10px] font-medium">Text</span>
              </TabsTrigger>
              <TabsTrigger value="extras" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-purple data-[state=active]:text-primary-foreground rounded-lg">
                <QrCode className="w-4 h-4" />
                <span className="text-[10px] font-medium">Extras</span>
              </TabsTrigger>
              <TabsTrigger value="fields" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-quirky-teal data-[state=active]:text-secondary-foreground rounded-lg">
                <Plus className="w-4 h-4" />
                <span className="text-[10px] font-medium">Fields</span>
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-6">
                <TabsContent value="template" className="mt-0">
                  <TemplateUploader
                    templateImage={backgroundImage}
                    onTemplateChange={setBackgroundImage}
                  />
                </TabsContent>

                <TabsContent value="text" className="mt-0 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-quirky-yellow flex items-center justify-center border-2 border-foreground">
                      <Type className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold">Name Text Settings</h3>
                  </div>
                  <TextCustomizer
                    settings={nameSettings}
                    onSettingsChange={setNameSettings}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                    label="Name"
                    colorAccent="bg-quirky-pink"
                  />
                </TabsContent>

                <TabsContent value="extras" className="mt-0 space-y-8">
                  <DateCustomizer
                    settings={dateSettings}
                    onSettingsChange={setDateSettings}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                  />
                  
                  <div className="border-t border-border pt-8">
                    <QRCustomizer
                      settings={qrSettings}
                      onSettingsChange={setQrSettings}
                      canvasWidth={canvasSize.width}
                      canvasHeight={canvasSize.height}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="fields" className="mt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-quirky-teal flex items-center justify-center border-2 border-foreground">
                      <Plus className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold">Template Fields</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fields define what data each generated asset will contain.
                  </p>
                  <div className="space-y-2">
                    {template.fields.map((field) => (
                      <div key={field.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded bg-background flex items-center justify-center border">
                          {field.type === 'text' && <Type className="w-4 h-4" />}
                          {field.type === 'date' && <Calendar className="w-4 h-4" />}
                          {field.type === 'qr' && <QrCode className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{field.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{field.type} {field.required && '• Required'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 gap-2" disabled>
                    <Plus className="w-4 h-4" />
                    Add Field (Coming Soon)
                  </Button>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Center - Preview */}
        <main className="flex-1 bg-muted/30 flex flex-col overflow-hidden">
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
          
          <div className="flex-1 overflow-auto flex items-center justify-center p-6">
            <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}>
              <CertificatePreview
                config={config}
                previewName="John Doe"
                onCanvasLoad={handleCanvasLoad}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
