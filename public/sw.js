const CACHE_NAME = 'dtu-hub-v2';
const urlsToCache = [
  '/',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        urlsToCache.map((url) => cache.add(url))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // تجاهل الطلبات غير GET وطلبات Supabase عشان البيانات والتفاعلات تفضل لحظية
  if (
    request.method !== 'GET' ||
    request.url.includes('supabase.co') ||
    !request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  // استراتيجية Network-First للصفحات عشان التحديثات الجديدة تظهر فوراً
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return networkResponse;
        })
        .catch(() => caches.match('/') || caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request);
    })
  );
});

// استقبال رسائل التطبيق (مؤقت المذاكرة + التنبيهات الجديدة)
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'TIMER_FINISHED') {
    self.registration.showNotification('DTU Study Timer', {
      body: event.data.message,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      tag: 'timer',
      requireInteraction: true,
      data: { url: '/timer', kind: 'timer' },
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

  if (event.data.type === 'NEW_ANNOUNCEMENT') {
    self.registration.showNotification(event.data.title || 'تنبيه جديد من DTU Hub', {
      body: event.data.message || '',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      dir: 'rtl',
      lang: 'ar',
      tag: `dtu-ann-${event.data.id || Date.now()}`,
      data: { url: event.data.url || '/', kind: 'announcement' }
    });
  }
});

// دعم إشعارات Push الخارجية في المستقبل
self.addEventListener('push', (event) => {
  if (!event.data) return;
  let payload = {};
  try {
    payload = event.data.json();
  } catch {
    payload = { title: 'تنبيه جديد من DTU Hub', body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || 'تنبيه جديد من DTU Hub', {
      body: payload.body || '',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      dir: 'rtl',
      lang: 'ar',
      tag: `dtu-push-${Date.now()}`,
      data: { url: payload.url || '/', kind: 'announcement' }
    })
  );
});

// التعامل مع الضغط على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'start_break') {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        if (clientList.length > 0) {
          clientList[0].postMessage({ type: 'START_BREAK' });
          return clientList[0].focus();
        }
      })
    );
    return;
  }

  if (event.action === 'reset') {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        if (clientList.length > 0) {
          clientList[0].postMessage({ type: 'RESET_TIMER' });
          return clientList[0].focus();
        }
      })
    );
    return;
  }

  // التوجيه الذكي: يفتح رابط الإعلان لو إعلان، أو /timer لو إشعار مؤقت
  const notifData = event.notification.data || {};
  const targetUrl = notifData.url || (notifData.kind === 'timer' ? '/timer' : '/');

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          if ('navigate' in client) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});