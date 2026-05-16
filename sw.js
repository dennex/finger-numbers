const CACHE_NAME = "finger-numbers-v25";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./audio-data.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./audio/0.wav",
  "./audio/1.wav",
  "./audio/2.wav",
  "./audio/3.wav",
  "./audio/4.wav",
  "./audio/5.wav",
  "./audio/6.wav",
  "./audio/7.wav",
  "./audio/8.wav",
  "./audio/9.wav",
  "./audio/10.wav",
  "./audio/count-prompt.wav",
  "./audio/play-prompt.wav",
  "./audio/yue-0.wav",
  "./audio/yue-1.wav",
  "./audio/yue-2.wav",
  "./audio/yue-3.wav",
  "./audio/yue-4.wav",
  "./audio/yue-5.wav",
  "./audio/yue-6.wav",
  "./audio/yue-7.wav",
  "./audio/yue-8.wav",
  "./audio/yue-9.wav",
  "./audio/yue-10.wav",
  "./audio/yue-count-prompt.wav",
  "./audio/yue-play-prompt.wav"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
