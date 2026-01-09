import { Settings, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function SettingsPage() {
  const handleClearData = () => {
    localStorage.removeItem('massgen_templates');
    localStorage.removeItem('massgen_assets');
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Settings</h2>
          <p className="text-muted-foreground">Manage your application settings</p>
        </div>

        <div className="space-y-6">
          {/* Storage Info */}
          <div className="bg-card border-2 border-foreground rounded-xl p-6 shadow-quirky-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-quirky-teal flex items-center justify-center border-2 border-foreground">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Local Storage</h3>
                <p className="text-sm text-muted-foreground">Data is stored in your browser</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              All your templates and generated assets are stored locally in your browser. 
              They will persist until you clear your browser data or use the button below.
            </p>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border-2 border-destructive/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center border-2 border-destructive/30">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">Irreversible actions</p>
              </div>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your templates and generated assets. 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
