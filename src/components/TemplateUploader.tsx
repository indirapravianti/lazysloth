import { useCallback } from 'react';
import { Upload, Image } from 'lucide-react';

interface TemplateUploaderProps {
  templateImage: string | null;
  onTemplateChange: (image: string) => void;
}

export function TemplateUploader({ templateImage, onTemplateChange }: TemplateUploaderProps) {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          onTemplateChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onTemplateChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          onTemplateChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onTemplateChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-quirky-pink flex items-center justify-center border-2 border-foreground">
          <Image className="w-4 h-4 text-primary-foreground" />
        </div>
        <h3 className="text-sm font-bold">Certificate Template</h3>
      </div>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-foreground/50 rounded-lg p-6 text-center transition-colors hover:bg-muted cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="template-upload"
        />
        <label htmlFor="template-upload" className="cursor-pointer">
          {templateImage ? (
            <div className="space-y-3">
              <img
                src={templateImage}
                alt="Certificate template"
                className="max-h-40 mx-auto rounded-lg border-2 border-foreground"
              />
              <p className="text-xs text-muted-foreground">Click or drag to replace</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Drop your template here</p>
                <p className="text-xs text-muted-foreground">or click to browse</p>
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
