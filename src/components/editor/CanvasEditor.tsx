import { useRef, useCallback, useState, useEffect } from 'react';
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
  fitToContainer?: boolean;
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
  fitToContainer = false,
}: CanvasEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [computedScale, setComputedScale] = useState(scale);

  // Calculate scale to fit container while respecting user zoom
  useEffect(() => {
    if (!fitToContainer || !wrapperRef.current || !imgRef.current) {
      setComputedScale(scale);
      return;
    }

    const updateScale = () => {
      if (!wrapperRef.current || !imgRef.current) return;
      
      const container = wrapperRef.current;
      const img = imgRef.current;
      
      if (!img.naturalWidth || !img.naturalHeight) return;

      const containerWidth = container.clientWidth - 32; // padding
      const containerHeight = container.clientHeight - 32;
      
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      
      // Calculate base scale to fit
      const baseScale = Math.min(
        containerWidth / imgWidth,
        containerHeight / imgHeight,
        1 // Don't upscale beyond 100%
      );
      
      // Apply user zoom on top of base scale
      setComputedScale(baseScale * scale);
    };

    updateScale();
    
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(wrapperRef.current);
    
    return () => resizeObserver.disconnect();
  }, [scale, fitToContainer, backgroundImage]);

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
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative inline-block"
        style={{ transform: `scale(${computedScale})`, transformOrigin: 'center' }}
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
            scale={computedScale}
            previewValue={previewEntry?.[field.id]}
            onSelect={() => onSelectField(field.id)}
            onPositionChange={(x, y) => onFieldPositionChange(field.id, x, y)}
          />
        ))}
      </div>
    </div>
  );
}
