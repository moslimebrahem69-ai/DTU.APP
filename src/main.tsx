import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { registerSW } from 'virtual:pwa-register';
import { OfflineNotifier } from './components/Common/OfflineNotifier';
import './index.css';

// Optimize React rendering
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

// Render application immediately
root.render(
  <React.StrictMode>
    <OfflineNotifier />
    <App />
  </React.StrictMode>
);

// Deferred Service Worker registration to prevent blocking initial render (Eliminates Workbox Latency)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    registerSW({ 
      immediate: false,
      onNeedRefresh() {},
      onOfflineReady() {}
    });
  });
}