import { useCallback } from 'react';
import { Users, FileText, X } from 'lucide-react';
import { parseNamesFile } from '@/lib/certificate-utils';
import { QuirkyButton } from '@/components/ui/quirky-button';

interface NamesUploaderProps {
  names: string[];
  onNamesChange: (names: string[]) => void;
}

export function NamesUploader({ names, onNamesChange }: NamesUploaderProps) {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          const parsedNames = parseNamesFile(content);
          onNamesChange(parsedNames);
        }
      };
      reader.readAsText(file);
    }
  }, [onNamesChange]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const parsedNames = parseNamesFile(e.target.value);
    onNamesChange(parsedNames);
  }, [onNamesChange]);

  const removeName = (index: number) => {
    onNamesChange(names.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    onNamesChange([]);
  };

  return (
    <div className="quirky-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-quirky-teal flex items-center justify-center border-2 border-foreground">
          <Users className="w-5 h-5 text-secondary-foreground" />
        </div>
        <h3 className="text-lg font-bold">Names List</h3>
        {names.length > 0 && (
          <span className="ml-auto bg-quirky-yellow text-accent-foreground text-sm font-bold px-3 py-1 rounded-full border-2 border-foreground">
            {names.length} name{names.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="file"
            accept=".txt,.csv"
            onChange={handleFileChange}
            className="hidden"
            id="names-upload"
          />
          <label htmlFor="names-upload">
            <QuirkyButton variant="outline" size="sm" asChild>
              <span>
                <FileText className="w-4 h-4" />
                Upload File
              </span>
            </QuirkyButton>
          </label>
          {names.length > 0 && (
            <QuirkyButton variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </QuirkyButton>
          )}
        </div>

        <textarea
          placeholder="Or type/paste names here (one per line, or comma-separated)"
          className="quirky-input w-full h-24 resize-none text-sm"
          value={names.join('\n')}
          onChange={handleTextChange}
        />

        {names.length > 0 && (
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-muted rounded-lg">
            {names.map((name, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-card px-3 py-1 rounded-full border-2 border-foreground text-sm font-medium"
              >
                {name}
                <button
                  onClick={() => removeName(index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
