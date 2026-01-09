import { Link } from 'react-router-dom';
import { Plus, FileImage, Sparkles, FolderOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useTemplates, useAssets } from '@/hooks/useTemplates';

export default function DashboardHome() {
  const { templates, isLoading: templatesLoading } = useTemplates();
  const { batches, isLoading: assetsLoading } = useAssets();

  const totalAssets = batches.reduce((sum, batch) => sum + batch.assets.length, 0);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Create and manage your templates and generated assets.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border-2 border-foreground rounded-xl p-5 shadow-quirky-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-quirky-pink flex items-center justify-center border-2 border-foreground">
                <FileImage className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">{templatesLoading ? '-' : templates.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Templates</p>
          </div>
          
          <div className="bg-card border-2 border-foreground rounded-xl p-5 shadow-quirky-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-quirky-teal flex items-center justify-center border-2 border-foreground">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">{assetsLoading ? '-' : batches.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Generation Batches</p>
          </div>
          
          <div className="bg-card border-2 border-foreground rounded-xl p-5 shadow-quirky-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-quirky-purple flex items-center justify-center border-2 border-foreground">
                <FolderOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">{assetsLoading ? '-' : totalAssets}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Assets Generated</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link to="/dashboard/templates/new" className="block">
            <div className="bg-card border-2 border-foreground rounded-xl p-6 shadow-quirky hover:shadow-quirky-lg transition-shadow group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-quirky-yellow flex items-center justify-center border-2 border-foreground">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Create Template</h3>
                    <p className="text-sm text-muted-foreground">Design a new template</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
          
          <Link to="/dashboard/generate" className="block">
            <div className="bg-card border-2 border-foreground rounded-xl p-6 shadow-quirky hover:shadow-quirky-lg transition-shadow group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-quirky-blue flex items-center justify-center border-2 border-foreground">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Generate Assets</h3>
                    <p className="text-sm text-muted-foreground">Mass produce from template</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Templates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Templates</h3>
            <Link to="/dashboard/templates">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          {templatesLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : templates.length === 0 ? (
            <div className="bg-muted/30 rounded-xl p-8 text-center border-2 border-dashed border-border">
              <p className="text-muted-foreground mb-4">No templates yet. Create your first one!</p>
              <Link to="/dashboard/templates/new">
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Template
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.slice(0, 3).map((template) => (
                <Link
                  key={template.id}
                  to={`/dashboard/templates/${template.id}`}
                  className="bg-card border-2 border-foreground rounded-xl p-4 shadow-quirky-sm hover:shadow-quirky transition-shadow"
                >
                  <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center border border-border overflow-hidden">
                    {template.backgroundImage ? (
                      <img src={template.backgroundImage} alt={template.name} className="w-full h-full object-cover" />
                    ) : (
                      <FileImage className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <h4 className="font-medium truncate">{template.name}</h4>
                  <p className="text-xs text-muted-foreground capitalize">{template.type.replace('_', ' ')}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
