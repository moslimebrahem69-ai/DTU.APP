import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { registerSW } from 'virtual:pwa-register';
import { OfflineNotifier } from './components/Common/OfflineNotifier';
import './index.css';

// Register PWA Service Worker for Offline functionality
registerSW({ immediate: true });

// Performance monitoring
const startTime = performance.now();

// Optimize React rendering
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
  document.head.appendChild(fontLink);
};

// Initialize app with performance tracking
const initializeApp = () => {
  preloadCriticalResources();
  
  root.render(
    <React.StrictMode>
      <OfflineNotifier />
      <App />
    </React.StrictMode>
  );
  
  // Log performance metrics
  const endTime = performance.now();
  console.log(`App initialized in ${endTime - startTime}ms`);
  
  // Track Core Web Vitals
  // Track Core Web Vitals (Updated for web-vitals v3/v4)
  // Track Core Web Vitals (Modern web-vitals v3/v4 API)
  if ('web-vitals' in window) {
    import('web-vitals').then((vitals: any) => {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = vitals;
      if (onCLS) onCLS(console.log);
      if (onINP) onINP(console.log);
      if (onFCP) onFCP(console.log);
      if (onLCP) onLCP(console.log);
      if (onTTFB) onTTFB(console.log);
    }).catch(() => {});
  }
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  requestIdleCallback(initializeApp);
} else {
  setTimeout(initializeApp, 0);
}