// Service Worker للـ Performance Optimization
// تخزين الموارد الثابتة والديناميكية

const CACHE_NAME = 'khatwa-v1.0.0';
const STATIC_CACHE = 'khatwa-static-v1.0.0';
const DYNAMIC_CACHE = 'khatwa-dynamic-v1.0.0';

// الموارد الثابتة الأساسية
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/globe.svg',
  '/favicon.ico',
  '/banar-cours.png',
  '/cours4.jpg',
  // الخطوط
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap',
  // المكتبات الأساسية
  '/_next/static/css/',
  '/_next/static/js/',
];

// المسارات التي نريد تخزينها ديناميكياً
const DYNAMIC_PATHS = ['/api/', '/courses', '/profile', '/exam', '/community'];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // تخزين الموارد الثابتة
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(
          STATIC_ASSETS.filter((asset) => !asset.includes('/_next/'))
        );
      }),
      // تخزين الموارد الديناميكية
      caches.open(DYNAMIC_CACHE),
    ]).then(() => {
      return self.skipWaiting();
    })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // حذف الإصدارات القديمة من التخزين
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // السيطرة على جميع الصفحات
      self.clients.claim(),
    ])
  );
});

// اعتراض الطلبات وتقديم الاستجابات من التخزين
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // تخزين الطلبات GET فقط
  if (request.method !== 'GET') return;

  // تخزين الصور والخطوط والملفات الثابتة
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    STATIC_ASSETS.some((asset) => request.url.includes(asset))
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // تخزين الاستجابات الصحيحة فقط
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // في حالة عدم توفر الإنترنت، إرجاع صفحة خطأ
            if (request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
    );
  }

  // تخزين الصفحات الديناميكية
  if (
    request.destination === 'document' ||
    DYNAMIC_PATHS.some((path) => url.pathname.startsWith(path))
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // تحديث التخزين في الخلفية
          fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
            })
            .catch(() => {
              // تجاهل الأخطاء في وضع عدم الاتصال
            });

          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // إرجاع صفحة من التخزين أو صفحة خطأ
            return caches.match('/').then((cachedResponse) => {
              return (
                cachedResponse ||
                new Response('Offline - لا يوجد اتصال بالإنترنت', {
                  status: 503,
                  statusText: 'Service Unavailable',
                })
              );
            });
          });
      })
    );
  }
});

// إدارة الرسائل من التطبيق الرئيسي
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
