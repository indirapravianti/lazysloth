import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Template, TemplateField } from '@/types/template';
import { generateQRCode, downloadCertificates } from '@/lib/certificate-utils';
import type { GeneratedCertificate } from '@/types/certificate';

interface DataEntry {
  [fieldId: string]: string;
}

interface PreviewPanelProps {
  template: Template;
  entries: DataEntry[];
}

export function PreviewPanel({ template, entries }: PreviewPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedCertificate[]>([]);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentEntry = entries[currentIndex];

  // Draw preview on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !template.backgroundImage) return;

    const drawPreview = async () => {
      const img = new window.Image();
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw background
        ctx.drawImage(img, 0, 0);

        // Draw each field
        for (const field of template.fields) {
          const value = currentEntry?.[field.id] || field.defaultValue || '';

          if (field.type === 'text' || field.type === 'date') {
            const displayValue =
              field.type === 'date'
                ? new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : value || `[${field.name}]`;

            ctx.fillStyle = field.style.color || '#1a1a1a';
            ctx.font = `${field.style.italic ? 'italic ' : ''}${
              field.style.bold ? 'bold ' : ''
            }${field.style.fontSize || 24}px ${field.style.fontFamily || 'Georgia, serif'}`;
            ctx.textAlign = (field.style.textAlign as CanvasTextAlign) || 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(displayValue, field.position.x, field.position.y);
          } else if (field.type === 'qr') {
            // Generate QR for preview
            const qrData = `SLOTH-${currentIndex + 1}-${Date.now()}`;
            const qrUrl = await generateQRCode(qrData, field.size?.width || 100);
            const qrImg = new window.Image();
            qrImg.onload = () => {
              const size = field.size?.width || 100;
              ctx.drawImage(
                qrImg,
                field.position.x - size / 2,
                field.position.y - size / 2,
                size,
                size
              );
            };
            qrImg.src = qrUrl;
          } else if (field.type === 'image' && value) {
            const fieldImg = new window.Image();
            fieldImg.onload = () => {
              const size = field.size?.width || 100;
              ctx.drawImage(
                fieldImg,
                field.position.x - size / 2,
                field.position.y - size / 2,
                size,
                size
              );
            };
            fieldImg.src = value;
          }
        }
      };
      img.src = template.backgroundImage;
    };

    drawPreview();
  }, [template, currentEntry, currentIndex]);

  // Generate all assets
  const handleGenerate = useCallback(async () => {
    if (!template.backgroundImage || entries.length === 0) return;

    setIsGenerating(true);
    setProgress(0);
    setGeneratedAssets([]);

    const assets: GeneratedCertificate[] = [];

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      
      // Create canvas for this entry
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      const bgImg = await new Promise<HTMLImageElement>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.src = template.backgroundImage!;
      });

      canvas.width = bgImg.width;
      canvas.height = bgImg.height;
      ctx.drawImage(bgImg, 0, 0);

      // Draw fields
      for (const field of template.fields) {
        const value = entry[field.id] || field.defaultValue || '';

        if (field.type === 'text' || field.type === 'date') {
          const displayValue =
            field.type === 'date'
              ? new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : value;

          ctx.fillStyle = field.style.color || '#1a1a1a';
          ctx.font = `${field.style.italic ? 'italic ' : ''}${
            field.style.bold ? 'bold ' : ''
          }${field.style.fontSize || 24}px ${field.style.fontFamily || 'Georgia, serif'}`;
          ctx.textAlign = (field.style.textAlign as CanvasTextAlign) || 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(displayValue, field.position.x, field.position.y);
        } else if (field.type === 'qr') {
          const qrData = `LAZYSLOTH-${i + 1}-${Date.now()}`;
          const qrUrl = await generateQRCode(qrData, field.size?.width || 100);
          const qrImg = await new Promise<HTMLImageElement>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve(img);
            img.src = qrUrl;
          });
          const size = field.size?.width || 100;
          ctx.drawImage(
            qrImg,
            field.position.x - size / 2,
            field.position.y - size / 2,
            size,
            size
          );
        } else if (field.type === 'image' && value) {
          const fieldImg = await new Promise<HTMLImageElement>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve(img);
            img.src = value;
          });
          const size = field.size?.width || 100;
          ctx.drawImage(
            fieldImg,
            field.position.x - size / 2,
            field.position.y - size / 2,
            size,
            size
          );
        }
      }

      // Get name for file
      const nameField = template.fields.find((f) => f.type === 'text');
      const name = nameField ? entry[nameField.id] || `Asset_${i + 1}` : `Asset_${i + 1}`;

      assets.push({
        name,
        dataUrl: canvas.toDataURL('image/png'),
      });

      setProgress(((i + 1) / entries.length) * 100);
    }

    setGeneratedAssets(assets);
    setIsGenerating(false);
  }, [template, entries]);

  // Download all
  const handleDownload = useCallback(() => {
    if (generatedAssets.length > 0) {
      downloadCertificates(generatedAssets);
    }
  }, [generatedAssets]);

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No entries to preview.</p>
        <p className="text-sm mt-1">Add data in the Data tab first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <span className="text-sm font-medium">
          {currentIndex + 1} / {entries.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentIndex((i) => Math.min(entries.length - 1, i + 1))}
          disabled={currentIndex === entries.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Canvas preview */}
      <div className="border rounded-lg overflow-hidden bg-muted/30">
        <canvas ref={canvasRef} className="max-w-full h-auto" />
      </div>

      {/* Current entry data */}
      <div className="bg-muted/50 rounded-lg p-3">
        <p className="text-xs font-medium mb-2">Entry Data:</p>
        <div className="space-y-1">
          {template.fields
            .filter((f) => f.type !== 'qr')
            .map((field) => (
              <div key={field.id} className="flex gap-2 text-xs">
                <span className="text-muted-foreground">{field.name}:</span>
                <span className="truncate">
                  {field.type === 'image'
                    ? currentEntry?.[field.id]
                      ? '📷 Image attached'
                      : 'No image'
                    : field.type === 'date'
                    ? new Date().toLocaleDateString()
                    : currentEntry?.[field.id] || '-'}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Generate button */}
      {isGenerating ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating assets...
          </div>
          <Progress value={progress} />
        </div>
      ) : generatedAssets.length > 0 ? (
        <Button onClick={handleDownload} className="w-full gap-2">
          <Download className="w-4 h-4" />
          Download {generatedAssets.length} Assets
        </Button>
      ) : (
        <Button onClick={handleGenerate} className="w-full gap-2">
          <Download className="w-4 h-4" />
          Generate {entries.length} Assets
        </Button>
      )}
    </div>
  );
}
