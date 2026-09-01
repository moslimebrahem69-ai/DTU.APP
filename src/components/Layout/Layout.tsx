import React from 'react';
import { Header } from './Header';
import { BackgroundAnimation } from '../Animations/BackgroundAnimation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <BackgroundAnimation />
      <Header />
      <main className="pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}