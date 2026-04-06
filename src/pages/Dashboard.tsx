import { mockPRs } from '@/src/data/mockData';
import { PRCard } from '@/src/components/PRCard';
import { Activity, ShieldCheck, Brain } from 'lucide-react';

export function Dashboard() {
  const criticalCount = mockPRs.filter(pr => pr.riskLevel === 'CRITICAL').length;
  const secureCount = mockPRs.filter(pr => pr.riskLevel === 'SECURE').length;

  return (
    <div className="space-y-10">
      {/* Header HUD */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-2">System Status: Active</p>
          <h2 className="font-headline text-4xl font-bold tracking-tight">Live Security Feed</h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container-high px-6 py-3 rounded-lg border-l-4 border-error shadow-sm">
            <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Critical Flaws</p>
            <p className="text-2xl font-headline font-bold text-error">{criticalCount.toString().padStart(2, '0')}</p>
          </div>
          <div className="bg-surface-container-high px-6 py-3 rounded-lg border-l-4 border-primary shadow-sm">
            <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Clean Pulls</p>
            <p className="text-2xl font-headline font-bold text-primary">{secureCount.toString().padStart(2, '0')}</p>
          </div>
        </div>
      </section>

      {/* Live PR Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockPRs.map((pr) => (
          <PRCard key={pr.id} pr={pr} />
        ))}

        {/* Bento Style Sidebar Column */}
        <div className="grid grid-rows-2 gap-6">
          <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-6 rounded-lg border border-outline-variant/10 shadow-lg">
            <h4 className="font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase mb-4 flex items-center gap-2">
              <Activity size={14} /> Sentinel Activity
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface/80">Scanning PRs...</span>
                <span className="text-primary text-[10px] animate-pulse font-bold">LIVE</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                <div className="bg-primary w-2/3 h-full"></div>
              </div>
              <p className="text-[10px] text-on-surface-variant">42 repositories currently under active surveillance.</p>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-secondary/5 to-transparent p-6 rounded-lg border border-secondary/10 shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="font-label text-xs font-bold tracking-widest text-secondary uppercase mb-2 flex items-center gap-2">
                <Brain size={14} /> AI Neural Insight
              </h4>
              <p className="text-sm italic text-on-surface-variant">
                "Unusual activity detected in 'payment-router'. Recommending manual audit of recent dependency changes."
              </p>
            </div>
            <div className="flex justify-end">
              <Brain size={32} className="text-secondary opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Threat Landscape Visualization */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-lg min-h-[320px] flex flex-col justify-between relative overflow-hidden border border-outline-variant/10">
          <div className="relative z-10">
            <h3 className="font-headline text-2xl font-bold mb-2">Global Threat Intelligence</h3>
            <p className="text-on-surface-variant max-w-md text-sm">Real-time monitoring of attempted breaches targeting your distributed infrastructure across 8 regions.</p>
          </div>
          <div className="flex gap-12 mt-8 relative z-10">
            <div>
              <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Top Vector</p>
              <p className="text-xl font-bold text-error">CVE-2024-819</p>
            </div>
            <div>
              <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Defense Velocity</p>
              <p className="text-xl font-bold text-primary">0.12ms</p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-high p-8 rounded-lg flex flex-col items-center justify-center text-center border border-outline-variant/10">
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-secondary/30 flex items-center justify-center mb-6">
            <ShieldCheck size={40} className="text-secondary" />
          </div>
          <h4 className="font-headline text-xl font-bold mb-2">Compliance Score</h4>
          <p className="text-3xl font-headline font-bold text-on-surface">98.4<span className="text-sm text-on-surface-variant ml-1">%</span></p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-4">SOX / HIPAA / GDPR</p>
        </div>
      </section>
    </div>
  );
}
