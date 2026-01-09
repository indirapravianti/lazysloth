import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileImage, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTemplates } from '@/hooks/useTemplates';
import { createDefaultTemplate, TEMPLATE_PRESETS, type TemplateType } from '@/types/template';
import { cn } from '@/lib/utils';

const typeColors: Record<TemplateType, string> = {
  certificate: 'bg-quirky-pink',
  business_card: 'bg-quirky-teal',
  lanyard: 'bg-quirky-purple',
  badge: 'bg-quirky-yellow',
  custom: 'bg-quirky-blue',
};

export default function NewTemplate() {
  const navigate = useNavigate();
  const { addTemplate } = useTemplates();
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState<TemplateType>('certificate');

  const handleCreate = () => {
    if (!name.trim()) return;
    const template = createDefaultTemplate(selectedType, name.trim());
    addTemplate(template);
    navigate(`/dashboard/templates/${template.id}`);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Create New Template</h2>
          <p className="text-muted-foreground">Choose a type and name for your template</p>
        </div>

        <div className="space-y-8">
          {/* Template Name */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-medium">Template Name</Label>
            <Input
              id="name"
              placeholder="e.g., Company Event Certificate"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Template Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Template Type</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {(Object.entries(TEMPLATE_PRESETS) as [TemplateType, typeof TEMPLATE_PRESETS[TemplateType]][]).map(
                ([type, preset]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      'bg-card border-2 rounded-xl p-4 text-left transition-all',
                      selectedType === type
                        ? 'border-primary shadow-quirky'
                        : 'border-foreground hover:shadow-quirky-sm'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center border-2 border-foreground shrink-0', typeColors[type])}>
                        <FileImage className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{preset.label}</h4>
                          {selectedType === type && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{preset.description}</p>
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Create Button */}
          <Button
            onClick={handleCreate}
            disabled={!name.trim()}
            size="lg"
            className="w-full gap-2"
          >
            Create & Open Editor
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
