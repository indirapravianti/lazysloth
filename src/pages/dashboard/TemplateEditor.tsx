import { useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ImageIcon, Layers, Database, Eye, ZoomIn, ZoomOut, ArrowLeft, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useTemplates } from '@/hooks/useTemplates';
import { TemplateUploader } from '@/components/TemplateUploader';
import { FieldsPanel } from '@/components/editor/FieldsPanel';
import { DataEntryPanel } from '@/components/editor/DataEntryPanel';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { CanvasEditor } from '@/components/editor/CanvasEditor';
import type { TemplateField, FieldType } from '@/types/template';
import { DEFAULT_FIELD_STYLES } from '@/types/template';

interface DataEntry {
  [fieldId: string]: string;
}

export default function TemplateEditor() {
  const { templateId } = useParams();
  const { getTemplate, updateTemplate, isLoading } = useTemplates();
  
  const template = getTemplate(templateId || '');
  
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [fields, setFields] = useState<TemplateField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(50);
  const [entries, setEntries] = useState<DataEntry[]>([]);
  const [activeTab, setActiveTab] = useState('template');

  // Load template data
  useEffect(() => {
    if (template) {
      setBackgroundImage(template.backgroundImage);
      setFields(template.fields);
    }
  }, [template]);

  // Auto-save template changes
  useEffect(() => {
    if (!template || isLoading) return;
    
    const timeout = setTimeout(() => {
      updateTemplate(template.id, {
        backgroundImage,
        fields,
      });
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [backgroundImage, fields, template, updateTemplate, isLoading]);

  const handleCanvasLoad = useCallback((width: number, height: number) => {
    setCanvasSize({ width, height });
  }, []);

  // Field management
  const addField = useCallback((type: FieldType) => {
    const newField: TemplateField = {
      id: `field_${Date.now()}`,
      name: type === 'qr' ? 'QR Code' : type === 'date' ? 'Date' : type === 'image' ? 'Photo' : 'New Field',
      type,
      required: type !== 'qr',
      position: {
        x: canvasSize.width / 2,
        y: canvasSize.height / 2,
      },
      style: { ...DEFAULT_FIELD_STYLES[type] },
      size: type === 'qr' || type === 'image' ? { width: 100, height: 100 } : undefined,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
  }, [canvasSize]);

  const deleteField = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  }, [selectedFieldId]);

  const updateField = useCallback((id: string, updates: Partial<TemplateField>) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  }, []);

  const updateFieldPosition = useCallback((id: string, x: number, y: number) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, position: { x, y } } : f
      )
    );
  }, []);

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
                <p className="text-xs text-muted-foreground">
                  {fields.length} fields • {entries.length} entries ready
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {entries.length > 0 && (
                <Button size="sm" className="gap-2" onClick={() => setActiveTab('preview')}>
                  <Download className="w-4 h-4" />
                  Generate {entries.length} Assets
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 border-r-2 border-foreground bg-card shrink-0 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid grid-cols-4 gap-1 p-2 bg-muted/50 rounded-none border-b-2 border-foreground shrink-0">
              <TabsTrigger value="template" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <ImageIcon className="w-4 h-4" />
                <span className="text-[10px] font-medium">Template</span>
              </TabsTrigger>
              <TabsTrigger value="fields" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-medium">Fields</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <Database className="w-4 h-4" />
                <span className="text-[10px] font-medium">Data</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                <Eye className="w-4 h-4" />
                <span className="text-[10px] font-medium">Preview</span>
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-4">
                <TabsContent value="template" className="mt-0">
                  <TemplateUploader
                    templateImage={backgroundImage}
                    onTemplateChange={setBackgroundImage}
                  />
                </TabsContent>

                <TabsContent value="fields" className="mt-0">
                  <FieldsPanel
                    fields={fields}
                    selectedFieldId={selectedFieldId}
                    canvasSize={canvasSize}
                    onAddField={addField}
                    onDeleteField={deleteField}
                    onSelectField={setSelectedFieldId}
                    onUpdateField={updateField}
                  />
                </TabsContent>

                <TabsContent value="data" className="mt-0">
                  <DataEntryPanel
                    fields={fields}
                    entries={entries}
                    onEntriesChange={setEntries}
                  />
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <PreviewPanel template={{ ...template, backgroundImage, fields }} entries={entries} />
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>

        {/* Center - Canvas Editor */}
        <main className="flex-1 bg-muted/30 flex flex-col overflow-hidden min-h-0">
          {/* Zoom controls */}
          <div className="flex items-center justify-center gap-2 p-3 border-b border-border bg-background/50 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(10, zoom - 10))}
              disabled={zoom <= 10}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              disabled={zoom >= 150}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Canvas area - fixed container with centered content */}
          <div className="flex-1 flex items-center justify-center p-4 min-h-0 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              <CanvasEditor
                backgroundImage={backgroundImage}
                fields={fields}
                selectedFieldId={selectedFieldId}
                previewEntry={entries[0]}
                scale={zoom / 100}
                onSelectField={setSelectedFieldId}
                onFieldPositionChange={updateFieldPosition}
                onCanvasLoad={handleCanvasLoad}
                fitToContainer
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
