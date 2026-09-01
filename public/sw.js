const CACHE_NAME = 'dtu-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Handle timer notifications
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TIMER_FINISHED') {
    self.registration.showNotification('DTU Study Timer', {
      body: event.data.message,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      tag: 'timer',
      requireInteraction: true,
      actions: [
        {
          action: 'start_break',
          title: 'بدء الاستراحة'
        },
        {
          action: 'reset',
          title: 'إعادة تعيين'
        }
      ]
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'start_break') {
    // Handle break start
    clients.matchAll().then((clients) => {
      if (clients.length > 0) {
        clients[0].postMessage({ type: 'START_BREAK' });
      }
    });
  } else if (event.action === 'reset') {
    // Handle reset
    clients.matchAll().then((clients) => {
      if (clients.length > 0) {
        clients[0].postMessage({ type: 'RESET_TIMER' });
      }
    });
  } else {
    // Default action - focus app
    clients.matchAll().then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
      } else {
        clients.openWindow('/timer');
      }
    });
  }
});