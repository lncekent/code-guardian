import { cn } from '@/src/lib/utils';

interface CodeDiffViewProps {
  filename: string;
  oldCode: string;
  newCode: string;
  key?: string | number;
}

export function CodeDiffView({ filename, oldCode, newCode }: CodeDiffViewProps) {
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');

  return (
    <div className="w-full border border-outline-variant/20 rounded-lg overflow-hidden bg-surface-container-lowest">
      <div className="bg-surface-container-high px-4 py-2 border-b border-outline-variant/20 flex items-center justify-between">
        <span className="font-mono text-xs text-on-surface-variant">{filename}</span>
        <div className="flex gap-2">
          <span className="text-[10px] text-error">- {oldLines.length} lines</span>
          <span className="text-[10px] text-primary">+ {newLines.length} lines</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-outline-variant/20">
        {/* Old Code */}
        <div className="p-4 overflow-x-auto">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-error font-bold">Original</div>
          <pre className="font-mono text-[11px] leading-relaxed text-on-surface-variant">
            {oldLines.map((line, i) => (
              <div key={i} className="flex gap-4 hover:bg-error/5">
                <span className="w-8 text-right opacity-30 select-none">{i + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* New Code */}
        <div className="p-4 overflow-x-auto">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-primary font-bold">Proposed</div>
          <pre className="font-mono text-[11px] leading-relaxed text-on-surface">
            {newLines.map((line, i) => (
              <div key={i} className="flex gap-4 hover:bg-primary/5">
                <span className="w-8 text-right opacity-30 select-none">{i + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
