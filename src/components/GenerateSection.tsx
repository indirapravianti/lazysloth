import { useState } from 'react';
import { Download, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { QuirkyButton } from '@/components/ui/quirky-button';
import type { CertificateConfig, GeneratedCertificate } from '@/types/certificate';
import { generateCertificate, downloadCertificates } from '@/lib/certificate-utils';
import { Progress } from '@/components/ui/progress';

interface GenerateSectionProps {
  config: CertificateConfig;
}

export function GenerateSection({ config }: GenerateSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCerts, setGeneratedCerts] = useState<GeneratedCertificate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = config.templateImage && config.names.length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setGeneratedCerts([]);

    try {
      const certificates: GeneratedCertificate[] = [];

      for (let i = 0; i < config.names.length; i++) {
        const cert = await generateCertificate(config, config.names[i], i);
        certificates.push(cert);
        setProgress(((i + 1) / config.names.length) * 100);
      }

      setGeneratedCerts(certificates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate certificates');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (generatedCerts.length === 0) return;
    await downloadCertificates(generatedCerts);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-quirky-pink to-quirky-purple flex items-center justify-center border-2 border-foreground">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Generate Certificates</h3>
          <p className="text-xs text-muted-foreground">
            {config.names.length} certificate{config.names.length !== 1 ? 's' : ''} ready
          </p>
        </div>
      </div>

      {!canGenerate && (
        <div className="bg-muted/50 rounded-lg p-4 border border-dashed border-border">
          <p className="text-xs text-muted-foreground text-center">
            {!config.templateImage
              ? '📸 Upload a template first'
              : '📝 Add some names'}
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm font-medium">
              Generating... {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-3 border border-destructive">
          <p className="text-xs">{error}</p>
        </div>
      )}

      {generatedCerts.length > 0 && !isGenerating && (
        <div className="bg-secondary/10 rounded-lg p-3 border border-secondary">
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {generatedCerts.length} certificate{generatedCerts.length !== 1 ? 's' : ''} ready! 🎉
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <QuirkyButton
          variant="quirkyPink"
          size="default"
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate All
            </>
          )}
        </QuirkyButton>

        {generatedCerts.length > 0 && (
          <QuirkyButton
            variant="quirkyTeal"
            size="default"
            onClick={handleDownload}
            className="w-full"
          >
            <Download className="w-4 h-4" />
            Download {generatedCerts.length > 1 ? 'ZIP' : 'PNG'}
          </QuirkyButton>
        )}
      </div>
    </div>
  );
}
