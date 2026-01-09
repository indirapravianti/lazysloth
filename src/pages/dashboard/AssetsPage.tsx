import { FolderOpen, Trash2, Download, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAssets } from '@/hooks/useTemplates';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { downloadCertificates } from '@/lib/certificate-utils';
import { format } from 'date-fns';

export default function AssetsPage() {
  const { batches, isLoading, deleteBatch } = useAssets();

  const handleDownloadBatch = async (batchId: string) => {
    const batch = batches.find((b) => b.id === batchId);
    if (!batch) return;
    
    await downloadCertificates(
      batch.assets.map((asset) => ({
        name: asset.name,
        dataUrl: asset.dataUrl,
        qrDataUrl: asset.qrDataUrl,
      }))
    );
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Generated Assets</h2>
          <p className="text-muted-foreground">View and download your generated assets</p>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : batches.length === 0 ? (
          <div className="bg-muted/30 rounded-xl p-12 text-center border-2 border-dashed border-border">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No assets yet</h3>
            <p className="text-muted-foreground">
              Generated assets will appear here after you run a generation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="bg-card border-2 border-foreground rounded-xl overflow-hidden shadow-quirky-sm"
              >
                <div className="p-4 flex items-center justify-between border-b border-border">
                  <div>
                    <h4 className="font-medium">{batch.templateName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {batch.assets.length} asset{batch.assets.length !== 1 ? 's' : ''} • {format(new Date(batch.createdAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadBatch(batch.id)}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download All
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => deleteBatch(batch.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Batch
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {batch.assets.slice(0, 6).map((asset) => (
                    <div key={asset.id} className="aspect-[4/3] bg-muted rounded-lg overflow-hidden border">
                      <img src={asset.dataUrl} alt={asset.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {batch.assets.length > 6 && (
                    <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border">
                      <span className="text-sm text-muted-foreground">+{batch.assets.length - 6} more</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
