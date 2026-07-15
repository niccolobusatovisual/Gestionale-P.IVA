/* Service worker — Gestionale P.IVA
   Strategia: network-first per index.html (così gli aggiornamenti arrivano subito),
   cache-first per il resto. Permette di aprire l'app anche offline. */
const CACHE = 'gestionale-piva-v3';
const ASSETS = ['.', 'index.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // MAI mettere in cache le chiamate al database: devono sempre andare in rete,
  // altrimenti la sincronizzazione restituisce dati vecchi congelati.
  if (url.hostname.endsWith('.supabase.co')) return;
  const isHTML = e.request.mode === 'navigate' || url.pathname.endsWith('index.html');
  if (isHTML) {
    // network-first: prova la rete, se offline usa la cache
    e.respondWith(
      fetch(e.request)
        .then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; })
        .catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
    );
  } else {
    // cache-first per asset statici
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return res;
      }))
    );
  }
});
