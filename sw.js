// Tach 9 offline cache · v62. Bump happens automatically on every package, so testers get updates.
const CACHE='tach9-v62';
const FILES=["./", "index.html", "manifest.webmanifest", "icons/icon-1024.png", "icons/favicon-64.png", "icons/icon-192.png", "icons/apple-touch-icon.png", "icons/icon-512.png", "fonts/oxanium-latin-ext-400-normal.woff2", "fonts/oxanium-latin-400-normal.woff2", "fonts/oxanium-latin-700-normal.woff2", "fonts/silkscreen-latin-400-normal.woff2", "fonts/oxanium-latin-ext-600-normal.woff2", "fonts/silkscreen-latin-700-normal.woff2", "fonts/silkscreen-latin-ext-700-normal.woff2", "fonts/oxanium-latin-ext-700-normal.woff2", "fonts/silkscreen-latin-ext-400-normal.woff2", "fonts/oxanium-latin-600-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// play straight from the cache, and quietly fetch a fresh copy for next launch
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin)c.put(e.request,r.clone());return r;}).catch(()=>hit);
    return hit||net;}));});
