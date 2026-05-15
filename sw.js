// =============================================
// اسم الكاش - غيّر "al-islam" لاسم التطبيق
// مثال للقبلة: 'qibla-v1'
// =============================================
const CACHE_NAME = 'al-islam-v1';

// =============================================
// الملفات اللي هتتحفظ للشغل بدون نت
// غيّر المسار '/Al_Islam/' لمسار تطبيقك
// مثال للقبلة: '/Qibla/'
// =============================================
const FILES_TO_CACHE = [
  '/Al_Islam/',
  '/Al_Islam/index.html'
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تنظيف الكاش القديم عند التحديث
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// استرجاع الملفات من الكاش لو مفيش نت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
