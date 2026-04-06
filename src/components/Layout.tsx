import React from 'react';
import { Sidebar, TopBar } from './Navigation';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <TopBar />
      <main className="ml-64 pt-24 px-8 pb-12">
        {children}
      </main>
    </div>
  );
}
