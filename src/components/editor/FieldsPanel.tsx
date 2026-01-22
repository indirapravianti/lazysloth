import { useState } from 'react';
import { Type, Image, QrCode, Calendar, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { TemplateField, FieldType } from '@/types/template';
import { FONT_OPTIONS } from '@/types/certificate';
import { cn } from '@/lib/utils';

interface FieldsPanelProps {
  fields: TemplateField[];
  selectedFieldId: string | null;
  canvasSize: { width: number; height: number };
  onAddField: (type: FieldType) => void;
  onDeleteField: (id: string) => void;
  onSelectField: (id: string | null) => void;
  onUpdateField: (id: string, updates: Partial<TemplateField>) => void;
}

const FIELD_TYPES: { type: FieldType; label: string; icon: React.ReactNode; description: string }[] = [
  { type: 'text', label: 'Text', icon: <Type className="w-4 h-4" />, description: 'Name, title, etc.' },
  { type: 'image', label: 'Image', icon: <Image className="w-4 h-4" />, description: 'Photo, logo' },
  { type: 'qr', label: 'QR Code', icon: <QrCode className="w-4 h-4" />, description: 'Auto-generated' },
  { type: 'date', label: 'Date', icon: <Calendar className="w-4 h-4" />, description: 'Date/time' },
];

export function FieldsPanel({
  fields,
  selectedFieldId,
  canvasSize,
  onAddField,
  onDeleteField,
  onSelectField,
  onUpdateField,
}: FieldsPanelProps) {
  const [expandedField, setExpandedField] = useState<string | null>(null);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const toggleExpanded = (id: string) => {
    setExpandedField(expandedField === id ? null : id);
    onSelectField(id);
  };

  return (
    <div className="space-y-6">
      {/* Add Field Section */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Add New Field</h4>
        <div className="grid grid-cols-2 gap-2">
          {FIELD_TYPES.map(({ type, label, icon, description }) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              className="h-auto py-3 flex flex-col items-center gap-1 hover:bg-primary/10 hover:border-primary"
              onClick={() => onAddField(type)}
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                {icon}
              </div>
              <span className="text-xs font-medium">{label}</span>
              <span className="text-[10px] text-muted-foreground">{description}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Existing Fields */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Fields ({fields.length})</h4>
        {fields.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No fields added yet. Add a field above.
          </p>
        ) : (
          <div className="space-y-2">
            {fields.map((field) => (
              <Collapsible
                key={field.id}
                open={expandedField === field.id}
                onOpenChange={() => toggleExpanded(field.id)}
              >
                <div
                  className={cn(
                    'border rounded-lg overflow-hidden transition-colors',
                    selectedFieldId === field.id && 'border-primary bg-primary/5'
                  )}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                      onClick={() => onSelectField(field.id)}
                    >
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                        {field.type === 'text' && <Type className="w-4 h-4" />}
                        {field.type === 'image' && <Image className="w-4 h-4" />}
                        {field.type === 'qr' && <QrCode className="w-4 h-4" />}
                        {field.type === 'date' && <Calendar className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{field.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {field.type}
                          {field.required && ' • Required'}
                        </p>
                      </div>
                      {expandedField === field.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-3 pb-3 pt-1 space-y-4 border-t">
                      {/* Field Name */}
                      <div className="space-y-2">
                        <Label className="text-xs">Field Name</Label>
                        <Input
                          value={field.name}
                          onChange={(e) =>
                            onUpdateField(field.id, { name: e.target.value })
                          }
                          placeholder="Enter field name"
                          className="h-8 text-sm"
                        />
                      </div>

                      {/* Required toggle */}
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Required</Label>
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked) =>
                            onUpdateField(field.id, { required: checked })
                          }
                        />
                      </div>

                      {/* Text/Date specific settings */}
                      {(field.type === 'text' || field.type === 'date') && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-xs">Font Family</Label>
                            <Select
                              value={field.style.fontFamily || 'Georgia, serif'}
                              onValueChange={(value) =>
                                onUpdateField(field.id, {
                                  style: { ...field.style, fontFamily: value },
                                })
                              }
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {FONT_OPTIONS.map((font) => (
                                  <SelectItem key={font.value} value={font.value}>
                                    {font.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs">Font Size</Label>
                              <span className="text-xs text-muted-foreground">
                                {field.style.fontSize || 24}px
                              </span>
                            </div>
                            <Slider
                              value={[field.style.fontSize || 24]}
                              min={8}
                              max={120}
                              step={1}
                              onValueChange={([value]) =>
                                onUpdateField(field.id, {
                                  style: { ...field.style, fontSize: value },
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs">Text Color</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={field.style.color || '#1a1a1a'}
                                onChange={(e) =>
                                  onUpdateField(field.id, {
                                    style: { ...field.style, color: e.target.value },
                                  })
                                }
                                className="w-8 h-8 rounded border cursor-pointer"
                              />
                              <Input
                                value={field.style.color || '#1a1a1a'}
                                onChange={(e) =>
                                  onUpdateField(field.id, {
                                    style: { ...field.style, color: e.target.value },
                                  })
                                }
                                className="h-8 text-sm flex-1"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant={field.style.bold ? 'default' : 'outline'}
                              size="sm"
                              className="flex-1"
                              onClick={() =>
                                onUpdateField(field.id, {
                                  style: { ...field.style, bold: !field.style.bold },
                                })
                              }
                            >
                              <span className="font-bold">B</span>
                            </Button>
                            <Button
                              variant={field.style.italic ? 'default' : 'outline'}
                              size="sm"
                              className="flex-1"
                              onClick={() =>
                                onUpdateField(field.id, {
                                  style: { ...field.style, italic: !field.style.italic },
                                })
                              }
                            >
                              <span className="italic">I</span>
                            </Button>
                          </div>
                        </>
                      )}

                      {/* QR / Image size settings */}
                      {(field.type === 'qr' || field.type === 'image') && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Size</Label>
                            <span className="text-xs text-muted-foreground">
                              {field.size?.width || 100}px
                            </span>
                          </div>
                          <Slider
                            value={[field.size?.width || 100]}
                            min={50}
                            max={300}
                            step={10}
                            onValueChange={([value]) =>
                              onUpdateField(field.id, {
                                size: { width: value, height: value },
                              })
                            }
                          />
                        </div>
                      )}

                      {/* Delete button */}
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => onDeleteField(field.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Field
                      </Button>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
