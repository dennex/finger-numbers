const CACHE_NAME = "finger-numbers-v32";
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
  "./audio/win.wav",
  "./audio/lose.wav",
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
  "./audio/yue-play-prompt.wav",
  "./audio/yue-win.wav",
  "./audio/yue-lose.wav",
  "./audio/zh-0.wav",
  "./audio/zh-1.wav",
  "./audio/zh-2.wav",
  "./audio/zh-3.wav",
  "./audio/zh-4.wav",
  "./audio/zh-5.wav",
  "./audio/zh-6.wav",
  "./audio/zh-7.wav",
  "./audio/zh-8.wav",
  "./audio/zh-9.wav",
  "./audio/zh-10.wav",
  "./audio/zh-count-prompt.wav",
  "./audio/zh-play-prompt.wav",
  "./audio/zh-win.wav",
  "./audio/zh-lose.wav",
  "./audio/ko-0.wav",
  "./audio/ko-1.wav",
  "./audio/ko-2.wav",
  "./audio/ko-3.wav",
  "./audio/ko-4.wav",
  "./audio/ko-5.wav",
  "./audio/ko-6.wav",
  "./audio/ko-7.wav",
  "./audio/ko-8.wav",
  "./audio/ko-9.wav",
  "./audio/ko-10.wav",
  "./audio/ko-count-prompt.wav",
  "./audio/ko-play-prompt.wav",
  "./audio/ko-win.wav",
  "./audio/ko-lose.wav",
  "./audio/ja-0.wav",
  "./audio/ja-1.wav",
  "./audio/ja-2.wav",
  "./audio/ja-3.wav",
  "./audio/ja-4.wav",
  "./audio/ja-5.wav",
  "./audio/ja-6.wav",
  "./audio/ja-7.wav",
  "./audio/ja-8.wav",
  "./audio/ja-9.wav",
  "./audio/ja-10.wav",
  "./audio/ja-count-prompt.wav",
  "./audio/ja-play-prompt.wav",
  "./audio/ja-win.wav",
  "./audio/ja-lose.wav"
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
