import { useRef, useCallback } from 'react';
import { DraggableField } from './DraggableField';
import type { TemplateField } from '@/types/template';

interface DataEntry {
  [fieldId: string]: string;
}

interface CanvasEditorProps {
  backgroundImage: string | null;
  fields: TemplateField[];
  selectedFieldId: string | null;
  previewEntry?: DataEntry;
  scale: number;
  onSelectField: (id: string | null) => void;
  onFieldPositionChange: (id: string, x: number, y: number) => void;
  onCanvasLoad: (width: number, height: number) => void;
}

export function CanvasEditor({
  backgroundImage,
  fields,
  selectedFieldId,
  previewEntry,
  scale,
  onSelectField,
  onFieldPositionChange,
  onCanvasLoad,
}: CanvasEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = useCallback(() => {
    if (imgRef.current) {
      onCanvasLoad(imgRef.current.naturalWidth, imgRef.current.naturalHeight);
    }
  }, [onCanvasLoad]);

  const handleBackgroundClick = () => {
    onSelectField(null);
  };

  if (!backgroundImage) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">Upload a template to get started</p>
          <p className="text-sm mt-1">Go to the Template tab to upload your design</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      onClick={handleBackgroundClick}
    >
      {/* Background image */}
      <img
        ref={imgRef}
        src={backgroundImage}
        alt="Template background"
        onLoad={handleImageLoad}
        className="block max-w-none"
        draggable={false}
      />

      {/* Draggable fields */}
      {fields.map((field) => (
        <DraggableField
          key={field.id}
          field={field}
          isSelected={selectedFieldId === field.id}
          scale={scale}
          previewValue={previewEntry?.[field.id]}
          onSelect={() => onSelectField(field.id)}
          onPositionChange={(x, y) => onFieldPositionChange(field.id, x, y)}
        />
      ))}
    </div>
  );
}
