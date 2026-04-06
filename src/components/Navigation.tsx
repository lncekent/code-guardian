import {
  Folder,
  Shield,
  Settings,
  UserCircle,
  Terminal,
  Bell,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { icon: Folder, label: "Projects", path: "/" },
    { icon: Shield, label: "Security Audits", path: "/audits" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low/70 backdrop-blur-3xl flex flex-col py-8 px-4 z-[60] shadow-[0px_24px_48px_rgba(0,0,0,0.5)]">
      <div className="mb-10 px-2">
        <h1 className="font-headline text-xl font-bold text-primary">
          Code-Guardian
        </h1>
        <p className="font-headline tracking-wider uppercase text-[10px] text-on-surface-variant mt-1">
          Sovereign Sentinel
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all active:scale-95",
                isActive
                  ? "text-primary bg-gradient-to-r from-primary/10 to-transparent border-r-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high",
              )}
            >
              <item.icon size={18} />
              <span className="font-headline tracking-wider uppercase text-xs">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2">
        <button className="w-full bg-primary text-on-primary py-3 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_20px_rgba(142,255,113,0.3)] transition-all">
          New Audit
        </button>
        <div className="mt-8 flex items-center gap-3 pt-6 border-t border-outline-variant/20">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-medium truncate">James D. Sentinel</p>
            <p className="text-[10px] text-on-surface-variant truncate">
              Lead Architect
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function TopBar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-50 bg-background/70 backdrop-blur-3xl border-b border-outline-variant/20 h-16 flex items-center justify-between px-8">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Terminal
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors"
            size={18}
          />
          <input
            className="w-full bg-surface-container-highest/50 border-0 border-b-2 border-outline-variant px-10 py-2 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface-variant/50"
            placeholder="Search repositories, vulnerabilities, or logs..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-on-surface-variant hover:text-primary transition-opacity relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-background"></span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-opacity">
          <Terminal size={20} />
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-opacity">
          <UserCircle size={20} />
        </button>
      </div>
    </header>
  );
}
