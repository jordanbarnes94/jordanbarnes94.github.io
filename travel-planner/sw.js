/* Travel Planner — offline app shell.
   Scoped to /travel-planner/ only (sits in that directory), so it never
   touches the rest of the site. The app is a single self-contained HTML file,
   so the "shell" is just this directory's index document. Bump CACHE to push
   a new version to devices that have the old one cached. */
const CACHE = 'travel-planner-v3';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Stale-while-revalidate: answer instantly from cache (works offline),
   refresh the cached copy in the background when a connection exists. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(cached => {
        const network = fetch(req)
          .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => null);
        // Navigations fall back to the cached shell when both miss (offline).
        return cached
          || network.then(res => res || (req.mode === 'navigate' ? cache.match('./index.html') : undefined));
      })
    )
  );
});
