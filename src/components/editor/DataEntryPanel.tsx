import { useState, useCallback } from 'react';
import { Upload, X, Plus, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { TemplateField } from '@/types/template';

interface DataEntry {
  [fieldId: string]: string; // For text/date fields, store value; for images, store data URL
}

interface DataEntryPanelProps {
  fields: TemplateField[];
  entries: DataEntry[];
  onEntriesChange: (entries: DataEntry[]) => void;
}

function parseNamesInput(text: string): string[] {
  return text
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function DataEntryPanel({ fields, entries, onEntriesChange }: DataEntryPanelProps) {
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  const [imageFiles, setImageFiles] = useState<Record<string, File[]>>({});

  // Get fields that need user input (exclude QR which is auto-generated)
  const inputFields = fields.filter((f) => f.type !== 'qr');
  const textFields = inputFields.filter((f) => f.type === 'text' || f.type === 'date');
  const imageFields = inputFields.filter((f) => f.type === 'image');

  // Handle text file upload
  const handleTextFileUpload = useCallback(
    (fieldId: string, file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTextInputs((prev) => ({
          ...prev,
          [fieldId]: content,
        }));
      };
      reader.readAsText(file);
    },
    []
  );

  // Handle image uploads
  const handleImageUpload = useCallback(
    (fieldId: string, files: FileList) => {
      const fileArray = Array.from(files);
      setImageFiles((prev) => ({
        ...prev,
        [fieldId]: [...(prev[fieldId] || []), ...fileArray],
      }));
    },
    []
  );

  // Remove image
  const removeImage = useCallback((fieldId: string, index: number) => {
    setImageFiles((prev) => ({
      ...prev,
      [fieldId]: prev[fieldId]?.filter((_, i) => i !== index) || [],
    }));
  }, []);

  // Generate entries from the input data
  const generateEntries = useCallback(async () => {
    // Parse text inputs
    const textValues: Record<string, string[]> = {};
    textFields.forEach((field) => {
      textValues[field.id] = parseNamesInput(textInputs[field.id] || '');
    });

    // Convert images to data URLs
    const imageDataUrls: Record<string, string[]> = {};
    for (const field of imageFields) {
      const files = imageFiles[field.id] || [];
      const dataUrls: string[] = [];
      for (const file of files) {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        dataUrls.push(dataUrl);
      }
      imageDataUrls[field.id] = dataUrls;
    }

    // Determine max count
    const textCounts = Object.values(textValues).map((arr) => arr.length);
    const imageCounts = Object.values(imageDataUrls).map((arr) => arr.length);
    const maxCount = Math.max(...textCounts, ...imageCounts, 0);

    if (maxCount === 0) {
      onEntriesChange([]);
      return;
    }

    // Build entries
    const newEntries: DataEntry[] = [];
    for (let i = 0; i < maxCount; i++) {
      const entry: DataEntry = {};
      
      // Add text values (cycle if needed)
      textFields.forEach((field) => {
        const values = textValues[field.id] || [];
        entry[field.id] = values[i % values.length] || '';
      });

      // Add image values (cycle if needed)
      imageFields.forEach((field) => {
        const urls = imageDataUrls[field.id] || [];
        entry[field.id] = urls[i % urls.length] || '';
      });

      newEntries.push(entry);
    }

    onEntriesChange(newEntries);
  }, [textInputs, imageFiles, textFields, imageFields, onEntriesChange]);

  // Count entries
  const getTextCount = (fieldId: string) => parseNamesInput(textInputs[fieldId] || '').length;
  const getImageCount = (fieldId: string) => imageFiles[fieldId]?.length || 0;

  if (inputFields.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No fields to fill in.</p>
        <p className="text-sm mt-1">Add fields in the Fields tab first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Enter data for each field. The number of generated assets will be based on the maximum number of entries.
        </AlertDescription>
      </Alert>

      {/* Text Fields */}
      {textFields.map((field) => (
        <div key={field.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {field.name}
              {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Badge variant="secondary">{getTextCount(field.id)} entries</Badge>
          </div>

          <Textarea
            placeholder={`Enter ${field.name.toLowerCase()} values, one per line or separated by commas...`}
            value={textInputs[field.id] || ''}
            onChange={(e) =>
              setTextInputs((prev) => ({ ...prev, [field.id]: e.target.value }))
            }
            rows={4}
            className="resize-none"
          />

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Or upload a file:</span>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".txt,.csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleTextFileUpload(field.id, file);
                }}
              />
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <span>
                  <Upload className="w-3 h-3" />
                  Upload .txt/.csv
                </span>
              </Button>
            </label>
          </div>
        </div>
      ))}

      {/* Image Fields */}
      {imageFields.map((field) => (
        <div key={field.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {field.name}
              {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Badge variant="secondary">{getImageCount(field.id)} images</Badge>
          </div>

          <div className="border-2 border-dashed rounded-lg p-4">
            <label className="cursor-pointer flex flex-col items-center gap-2">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleImageUpload(field.id, e.target.files);
                }}
              />
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                Click to upload images
              </span>
            </label>
          </div>

          {/* Image previews */}
          {(imageFiles[field.id]?.length || 0) > 0 && (
            <ScrollArea className="h-32">
              <div className="flex gap-2 flex-wrap">
                {imageFiles[field.id]?.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <button
                      className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(field.id, index)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] truncate px-1">
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          <p className="text-xs text-muted-foreground">
            💡 Tip: Images will be matched in order with other fields. If you have 5 names and 3 images, images will cycle.
          </p>
        </div>
      ))}

      {/* Generate button */}
      <Button onClick={generateEntries} className="w-full gap-2">
        <Plus className="w-4 h-4" />
        Generate {Math.max(
          ...textFields.map((f) => getTextCount(f.id)),
          ...imageFields.map((f) => getImageCount(f.id)),
          0
        )} Entries
      </Button>

      {/* Entries summary */}
      {entries.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm font-medium mb-2">
            ✅ {entries.length} entries ready
          </p>
          <p className="text-xs text-muted-foreground">
            Go to the Preview tab to see how they look, then generate your assets.
          </p>
        </div>
      )}
    </div>
  );
}
