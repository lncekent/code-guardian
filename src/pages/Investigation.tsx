import { useParams, Link } from 'react-router-dom';
import { mockPRs } from '@/src/data/mockData';
import { CodeDiffView } from '@/src/components/CodeDiffView';
import { ArrowLeft, GitCommit, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Investigation() {
  const { id } = useParams();
  const pr = mockPRs.find(p => p.id === id);

  if (!pr) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <ShieldQuestion size={64} className="text-on-surface-variant opacity-20" />
        <h2 className="text-2xl font-bold">PR Not Found</h2>
        <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const riskIcon = {
    CRITICAL: <ShieldAlert className="text-error" />,
    MEDIUM: <ShieldAlert className="text-secondary" />,
    SECURE: <ShieldCheck className="text-primary" />,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors">
          <ArrowLeft size={18} />
          <span className="font-label uppercase text-xs tracking-wider">Back to Feed</span>
        </Link>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-high rounded text-xs font-bold uppercase tracking-widest border border-outline-variant/20 hover:bg-surface-container-highest transition-colors">
            Request Changes
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(142,255,113,0.3)] transition-all">
            Approve & Merge
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-container-high p-6 rounded-lg border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              {riskIcon[pr.riskLevel]}
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest",
                pr.riskLevel === 'CRITICAL' ? 'text-error border-error/20 bg-error/15' : 
                pr.riskLevel === 'MEDIUM' ? 'text-secondary border-secondary/20 bg-secondary/15' : 'text-primary border-primary/20 bg-primary/15'
              )}>
                {pr.riskLevel}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-4">{pr.title}</h1>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
              <GitCommit size={16} />
              <span>PR #{pr.number} • {pr.service}</span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">Author</h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-bold">
                    {pr.author.avatar}
                  </div>
                  <span className="text-sm">{pr.author.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/10 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-secondary font-bold">Security Analysis</h4>
            {pr.error && (
              <div className="p-4 bg-error/5 border-l-2 border-error rounded">
                <p className="text-xs font-bold text-error mb-1">Vulnerability Detected</p>
                <p className="text-sm text-on-surface-variant">{pr.error}</p>
              </div>
            )}
            {pr.insight && (
              <div className="p-4 bg-secondary/5 border-l-2 border-secondary rounded">
                <p className="text-xs font-bold text-secondary mb-1">AI Insight</p>
                <p className="text-sm text-on-surface-variant">{pr.insight}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Diff */}
        <div className="lg:col-span-2 space-y-6">
          <h4 className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Code Changes</h4>
          {pr.diff.map((diff, index) => (
            <CodeDiffView 
              key={index}
              filename={diff.filename}
              oldCode={diff.oldCode}
              newCode={diff.newCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
