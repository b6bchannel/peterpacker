const PACKER_CACHE_PREFIX = "peterpacker-shell-";
const PACKER_CACHE = `${PACKER_CACHE_PREFIX}2026-07-29-startup-v2`;
const PACKER_SCOPE = self.registration.scope;
const PACKER_INDEX = new URL("index.html", PACKER_SCOPE).href;
const PACKER_SHELL = [
  "index.html",
  "manifest.webmanifest",
  "app.png",
  "favicon.png",
  "fonts/lexend-latin-variable.woff2",
  "assets/index-CNtaFij_.js",
  "assets/index-D22QyEbH.css",
  "assets/backup-import.css"
].map(path => new URL(path, PACKER_SCOPE).href);

async function cacheCurrentShell() {
  const cache = await caches.open(PACKER_CACHE);

  await Promise.all(
    PACKER_SHELL.map(async url => {
      const response = await fetch(new Request(url, { cache: "reload" }));

      if (!response.ok) {
        throw new Error(`无法缓存 ${url}`);
      }

      await cache.put(url, response);
    })
  );
}

self.addEventListener("install", event => {
  event.waitUntil(
    cacheCurrentShell().then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then(keys =>
          Promise.all(
            keys
              .filter(
                key =>
                  key.startsWith(PACKER_CACHE_PREFIX) &&
                  key !== PACKER_CACHE
              )
              .map(key => caches.delete(key))
          )
        ),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const scopeUrl = new URL(PACKER_SCOPE);

  if (
    url.origin !== scopeUrl.origin ||
    !url.pathname.startsWith(scopeUrl.pathname)
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      caches
        .open(PACKER_CACHE)
        .then(cache => cache.match(PACKER_INDEX))
        .then(cached => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    caches.open(PACKER_CACHE).then(async cache => {
      const cached = await cache.match(request);

      if (cached) {
        return cached;
      }

      const response = await fetch(request);

      if (response.ok) {
        await cache.put(request, response.clone());
      }

      return response;
    })
  );
});
