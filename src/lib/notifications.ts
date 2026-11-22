import { supabase } from './supabase';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPushNotifications(
  academicYear?: string
): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  const permission =
    Notification.permission === 'granted'
      ? 'granted'
      : await Notification.requestPermission();

  if (permission !== 'granted') {
    return permission;
  }

  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !VAPID_PUBLIC_KEY) {
    return permission;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    const subJson = subscription.toJSON();
    const endpoint = subJson.endpoint;
    const p256dh = subJson.keys?.p256dh;
    const auth = subJson.keys?.auth;

    if (endpoint && p256dh && auth) {
      const year = academicYear || localStorage.getItem('dtu-student-year') || 'all';
      await supabase.rpc('save_push_subscription', {
        p_endpoint: endpoint,
        p_p256dh: p256dh,
        p_auth: auth,
        p_academic_year: year,
        p_user_agent: navigator.userAgent.slice(0, 250),
      });
    }
  } catch (err) {
    console.error('Failed to register push subscription:', err);
  }

  return permission;
}

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
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
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