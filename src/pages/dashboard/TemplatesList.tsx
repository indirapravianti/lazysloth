import { Link } from 'react-router-dom';
import { Plus, FileImage, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTemplates } from '@/hooks/useTemplates';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TEMPLATE_PRESETS } from '@/types/template';

export default function TemplatesList() {
  const { templates, isLoading, deleteTemplate } = useTemplates();

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Templates</h2>
            <p className="text-muted-foreground">Manage your template designs</p>
          </div>
          <Link to="/dashboard/templates/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Template
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : templates.length === 0 ? (
          <div className="bg-muted/30 rounded-xl p-12 text-center border-2 border-dashed border-border">
            <FileImage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates yet</h3>
            <p className="text-muted-foreground mb-6">Create your first template to get started</p>
            <Link to="/dashboard/templates/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Template
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-card border-2 border-foreground rounded-xl overflow-hidden shadow-quirky-sm hover:shadow-quirky transition-shadow group"
              >
                <Link to={`/dashboard/templates/${template.id}`}>
                  <div className="aspect-video bg-muted flex items-center justify-center border-b-2 border-foreground overflow-hidden">
                    {template.backgroundImage ? (
                      <img src={template.backgroundImage} alt={template.name} className="w-full h-full object-cover" />
                    ) : (
                      <FileImage className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/dashboard/templates/${template.id}`} className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {TEMPLATE_PRESETS[template.type]?.label || template.type}
                      </p>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => deleteTemplate(template.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {template.fields.length} field{template.fields.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
