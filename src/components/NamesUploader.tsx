import { useCallback, useState } from 'react';
import { Users, FileText, X } from 'lucide-react';
import { QuirkyButton } from '@/components/ui/quirky-button';

interface NamesUploaderProps {
  names: string[];
  onNamesChange: (names: string[]) => void;
}

function parseNamesFromFile(content: string): string[] {
  return content
    .split(/[\n,;]+/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

export function NamesUploader({ names, onNamesChange }: NamesUploaderProps) {
  // Keep raw text separate from parsed names to allow free typing
  const [rawText, setRawText] = useState('');

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          const parsedNames = parseNamesFromFile(content);
          onNamesChange(parsedNames);
          setRawText(parsedNames.join('\n'));
        }
      };
      reader.readAsText(file);
    }
  }, [onNamesChange]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRawText(value);
    
    // Parse names on newline only for live updating
    const parsedNames = value
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
    onNamesChange(parsedNames);
  }, [onNamesChange]);

  const removeName = (index: number) => {
    const newNames = names.filter((_, i) => i !== index);
    onNamesChange(newNames);
    setRawText(newNames.join('\n'));
  };

  const clearAll = () => {
    onNamesChange([]);
    setRawText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-quirky-teal flex items-center justify-center border-2 border-foreground">
          <Users className="w-4 h-4 text-secondary-foreground" />
        </div>
        <h3 className="text-sm font-bold">Names List</h3>
        {names.length > 0 && (
          <span className="ml-auto bg-quirky-yellow text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full border-2 border-foreground">
            {names.length}
          </span>
        )}
      </div>

      <div className="flex gap-2">
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
              Upload
            </span>
          </QuirkyButton>
        </label>
        {names.length > 0 && (
          <QuirkyButton variant="ghost" size="sm" onClick={clearAll}>
            Clear
          </QuirkyButton>
        )}
      </div>

      <textarea
        placeholder="Type names here (one per line)"
        className="quirky-input w-full h-28 resize-none text-sm"
        value={rawText}
        onChange={handleTextChange}
      />

      {names.length > 0 && (
        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto p-2 bg-muted/50 rounded-lg">
          {names.map((name, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-card px-2 py-0.5 rounded-full border border-border text-xs font-medium"
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
  );
}
