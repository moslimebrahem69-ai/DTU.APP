import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

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
      <App />
    </React.StrictMode>
  );
  
  // Log performance metrics
  const endTime = performance.now();
  console.log(`App initialized in ${endTime - startTime}ms`);
  
  // Track Core Web Vitals
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  requestIdleCallback(initializeApp);
} else {
  setTimeout(initializeApp, 0);
}