import { GitCommit, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { PullRequest } from "@/src/data/mockData";

interface PRCardProps {
  pr: PullRequest;
  key?: string | number;
}

export function PRCard({ pr }: PRCardProps) {
  const riskColors = {
    CRITICAL: "text-error border-error/20 bg-error/15",
    MEDIUM: "text-secondary border-secondary/20 bg-secondary/15",
    SECURE: "text-primary border-primary/20 bg-primary/15",
  };

  const borderColors = {
    CRITICAL: "from-error",
    MEDIUM: "from-secondary",
    SECURE: "from-primary",
  };

  return (
    <div className="bg-surface-container-high p-6 rounded-lg relative overflow-hidden group">
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1 bg-gradient-to-r to-transparent opacity-50",
          borderColors[pr.riskLevel],
        )}
      ></div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <GitCommit size={14} className="text-on-surface-variant" />
          <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter">
            PR #{pr.number} • {pr.service}
          </span>
        </div>
        <div
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded border",
            riskColors[pr.riskLevel],
          )}
        >
          {pr.riskLevel}
        </div>
      </div>

      <h3
        className={cn(
          "text-lg font-bold mb-3 leading-tight transition-colors",
          pr.riskLevel === "CRITICAL"
            ? "group-hover:text-error"
            : pr.riskLevel === "MEDIUM"
              ? "group-hover:text-secondary"
              : "group-hover:text-primary",
        )}
      >
        {pr.title}
      </h3>

      <div className="bg-surface-container-lowest p-4 rounded mb-4 font-mono text-[11px] leading-relaxed border-l-2 border-outline-variant/30">
        {pr.error && (
          <p className="text-on-surface-variant">
            <span className={cn(riskColors[pr.riskLevel].split(" ")[0])}>
              Error:
            </span>{" "}
            {pr.error}
          </p>
        )}
        {pr.insight && (
          <p className={cn("text-on-surface-variant", pr.error && "mt-2")}>
            <span className="text-secondary">Insight:</span> {pr.insight}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full border-2 border-surface-container-high bg-surface-container-highest flex items-center justify-center text-[8px] font-bold">
            {pr.author.avatar}
          </div>
        </div>
        <Link
          to={`/investigate/${pr.id}`}
          className="text-secondary text-xs font-bold font-label uppercase tracking-wider flex items-center gap-1 group/btn"
        >
          Investigate{" "}
          <ArrowRight
            size={12}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
