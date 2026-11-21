export async function showPlatformNotification(
  title: string,
  body: string,
  options?: { url?: string | null; id?: string }
): Promise<void> {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  if (options?.id) {
    const notifiedKey = 'dtu-notified-ann-ids';
    try {
      const raw = sessionStorage.getItem(notifiedKey);
      const ids: string[] = raw ? (JSON.parse(raw) as string[]) : [];
      if (ids.includes(options.id)) return;
      ids.push(options.id);
      sessionStorage.setItem(notifiedKey, JSON.stringify(ids.slice(-30)));
    } catch {
      // ignore storage errors
    }
  }

  const notifOptions: NotificationOptions = {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    dir: 'rtl',
    lang: 'ar',
    tag: options?.id ? `dtu-ann-${options.id}` : `dtu-ann-${Date.now()}`,
    data: { url: options?.url || '/' },
  };

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, notifOptions);
      return;
    }
    new Notification(title, notifOptions);
  } catch (err) {
    console.error('Notification error:', err);
  }
}