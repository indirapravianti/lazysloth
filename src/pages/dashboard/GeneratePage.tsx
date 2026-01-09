import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, FileImage, Users, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTemplates, useAssets } from '@/hooks/useTemplates';
import { NamesUploader } from '@/components/NamesUploader';
import { GenerateSection } from '@/components/GenerateSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { CertificateConfig } from '@/types/certificate';

export default function GeneratePage() {
  const [searchParams] = useSearchParams();
  const { templates, isLoading } = useTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [names, setNames] = useState<string[]>([]);

  // Pre-select template from URL
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId && templates.find((t) => t.id === templateId)) {
      setSelectedTemplateId(templateId);
    }
  }, [searchParams, templates]);

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  // Build config from template
  const config: CertificateConfig | null = selectedTemplate ? {
    templateImage: selectedTemplate.backgroundImage,
    names,
    nameSettings: {
      color: selectedTemplate.fields[0]?.style.color || '#1a1a1a',
      fontFamily: selectedTemplate.fields[0]?.style.fontFamily || 'Georgia, serif',
      fontSize: selectedTemplate.fields[0]?.style.fontSize || 48,
      x: selectedTemplate.fields[0]?.position.x || selectedTemplate.canvas.width / 2,
      y: selectedTemplate.fields[0]?.position.y || selectedTemplate.canvas.height * 0.45,
    },
    dateSettings: {
      enabled: false,
      format: 'full',
      color: '#4a4a4a',
      fontFamily: 'Georgia, serif',
      fontSize: 18,
      x: selectedTemplate.canvas.width / 2,
      y: selectedTemplate.canvas.height * 0.75,
    },
    qrSettings: {
      enabled: false,
      size: 80,
      x: selectedTemplate.canvas.width * 0.85,
      y: selectedTemplate.canvas.height * 0.85,
    },
  } : null;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Generate Assets</h2>
          <p className="text-muted-foreground">Select a template, add your data, and mass generate</p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Select Template */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-quirky-pink flex items-center justify-center border-2 border-foreground text-sm font-bold">
                1
              </div>
              <h3 className="font-bold">Select Template</h3>
            </div>
            
            {isLoading ? (
              <p className="text-muted-foreground">Loading templates...</p>
            ) : templates.length === 0 ? (
              <div className="bg-muted/30 rounded-xl p-6 border-2 border-dashed border-border">
                <p className="text-muted-foreground mb-4">No templates available. Create one first!</p>
                <Link to="/dashboard/templates/new">
                  <Button size="sm" className="gap-2">
                    <FileImage className="w-4 h-4" />
                    Create Template
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Choose a template</Label>
                <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedTemplate && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mt-3">
                    <div className="w-16 h-12 bg-muted rounded border overflow-hidden">
                      {selectedTemplate.backgroundImage ? (
                        <img src={selectedTemplate.backgroundImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileImage className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{selectedTemplate.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedTemplate.canvas.width} × {selectedTemplate.canvas.height}px
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Add Data */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-quirky-teal flex items-center justify-center border-2 border-foreground text-sm font-bold">
                2
              </div>
              <h3 className="font-bold">Add Names / Data</h3>
            </div>
            
            <NamesUploader names={names} onNamesChange={setNames} />
          </div>

          {/* Step 3: Generate */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-quirky-purple flex items-center justify-center border-2 border-foreground text-sm font-bold">
                3
              </div>
              <h3 className="font-bold">Generate & Download</h3>
            </div>
            
            {config ? (
              <GenerateSection config={config} />
            ) : (
              <div className="bg-muted/30 rounded-xl p-6 border-2 border-dashed border-border text-center">
                <p className="text-muted-foreground">Select a template to enable generation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
