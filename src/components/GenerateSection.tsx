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
    <div className="quirky-card p-6 bg-gradient-to-br from-quirky-pink/10 via-quirky-yellow/10 to-quirky-teal/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quirky-pink to-quirky-purple flex items-center justify-center border-2 border-foreground animate-float">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Generate Certificates</h3>
          <p className="text-sm text-muted-foreground">
            {config.names.length} certificate{config.names.length !== 1 ? 's' : ''} ready to generate
          </p>
        </div>
      </div>

      {!canGenerate && (
        <div className="bg-muted rounded-lg p-4 mb-4 border-2 border-dashed border-foreground">
          <p className="text-sm text-muted-foreground text-center">
            {!config.templateImage
              ? '📸 Upload a certificate template first!'
              : '📝 Add some names to generate certificates for!'}
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm font-medium">
              Generating... {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-4 border-2 border-destructive">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {generatedCerts.length > 0 && !isGenerating && (
        <div className="bg-secondary/20 rounded-lg p-4 mb-4 border-2 border-secondary">
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              {generatedCerts.length} certificate{generatedCerts.length !== 1 ? 's' : ''} generated! 🎉
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <QuirkyButton
          variant="quirkyPink"
          size="lg"
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate All
            </>
          )}
        </QuirkyButton>

        {generatedCerts.length > 0 && (
          <QuirkyButton
            variant="quirkyTeal"
            size="lg"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="w-5 h-5" />
            Download {generatedCerts.length > 1 ? 'ZIP' : 'PNG'}
          </QuirkyButton>
        )}
      </div>
    </div>
  );
}
