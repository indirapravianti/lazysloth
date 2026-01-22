import { useRef, useState, useEffect, useCallback } from 'react';
import { Type, Image, QrCode, Calendar, GripVertical } from 'lucide-react';
import type { TemplateField } from '@/types/template';
import { cn } from '@/lib/utils';

interface DraggableFieldProps {
  field: TemplateField;
  isSelected: boolean;
  scale: number;
  previewValue?: string;
  onSelect: () => void;
  onPositionChange: (x: number, y: number) => void;
}

export function DraggableField({
  field,
  isSelected,
  scale,
  previewValue,
  onSelect,
  onPositionChange,
}: DraggableFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect();
      
      const rect = fieldRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
      setIsDragging(true);
    },
    [onSelect]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !fieldRef.current) return;

      const parent = fieldRef.current.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const newX = (e.clientX - parentRect.left - dragOffset.x) / scale;
      const newY = (e.clientY - parentRect.top - dragOffset.y) / scale;

      // Clamp to parent bounds
      const clampedX = Math.max(0, Math.min(newX, parent.offsetWidth / scale));
      const clampedY = Math.max(0, Math.min(newY, parent.offsetHeight / scale));

      onPositionChange(clampedX, clampedY);
    },
    [isDragging, dragOffset, scale, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getFieldIcon = () => {
    switch (field.type) {
      case 'text':
        return <Type className="w-3 h-3" />;
      case 'image':
        return <Image className="w-3 h-3" />;
      case 'qr':
        return <QrCode className="w-3 h-3" />;
      case 'date':
        return <Calendar className="w-3 h-3" />;
      default:
        return <Type className="w-3 h-3" />;
    }
  };

  const getDisplayValue = () => {
    if (previewValue) return previewValue;
    
    switch (field.type) {
      case 'text':
        return field.defaultValue || `[${field.name}]`;
      case 'date':
        return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      case 'qr':
        return null;
      case 'image':
        return null;
      default:
        return `[${field.name}]`;
    }
  };

  const displayValue = getDisplayValue();

  return (
    <div
      ref={fieldRef}
      className={cn(
        'absolute cursor-move select-none transition-shadow',
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isDragging && 'z-50'
      )}
      style={{
        left: field.position.x,
        top: field.position.y,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Field content */}
      {field.type === 'text' || field.type === 'date' ? (
        <div
          style={{
            fontSize: field.style.fontSize || 24,
            fontFamily: field.style.fontFamily || 'Georgia, serif',
            color: field.style.color || '#1a1a1a',
            fontWeight: field.style.bold ? 'bold' : 'normal',
            fontStyle: field.style.italic ? 'italic' : 'normal',
            textAlign: field.style.textAlign || 'center',
            whiteSpace: 'nowrap',
          }}
          className="px-2"
        >
          {displayValue}
        </div>
      ) : field.type === 'qr' ? (
        <div
          className="bg-white p-2 border-2 border-dashed border-muted-foreground/50 flex items-center justify-center"
          style={{
            width: field.size?.width || 100,
            height: field.size?.height || 100,
          }}
        >
          <QrCode className="w-1/2 h-1/2 text-muted-foreground" />
        </div>
      ) : field.type === 'image' ? (
        <div
          className="bg-muted/50 border-2 border-dashed border-muted-foreground/50 flex items-center justify-center"
          style={{
            width: field.size?.width || 100,
            height: field.size?.height || 100,
          }}
        >
          <Image className="w-1/3 h-1/3 text-muted-foreground" />
        </div>
      ) : null}

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full whitespace-nowrap">
          {getFieldIcon()}
          <span>{field.name}</span>
        </div>
      )}

      {/* Drag handle */}
      {isSelected && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-0.5 rounded cursor-grab">
          <GripVertical className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}
