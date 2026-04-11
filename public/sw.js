/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/_next/precache.FVn52M0YRr3ds7RMpcFaf.7bee0a5c855540631d82cb9fb0271cc3.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "/favicon.ico",
    "revision": "1f81b70cd059eecb15d24347197d7b05"
  },
  {
    "url": "/icons/circle.png",
    "revision": "57398a81cbdc04b4bfe595687dd22b1e"
  },
  {
    "url": "/icons/square.png",
    "revision": "1339a889733626d2af09d18bb50d44ed"
  },
  {
    "url": "/images/background.jpg",
    "revision": "8dbc821cc8d5ebfef4221d3ec65d1b4f"
  },
  {
    "url": "/images/bisyojo_chan.png",
    "revision": "67b094b0a2de15fd18983a6d869b0eee"
  },
  {
    "url": "/images/sp/background.jpg",
    "revision": "2afb8b8bb2e1d6adfed047dd9be9d171"
  },
  {
    "url": "/images/sp/bisyojo_chan.png",
    "revision": "4606d1c182c8f4e527283c7ab55b8acb"
  },
  {
    "url": "/manifest.json",
    "revision": "6f0001fec557f7bca53b48e47fe80e68"
  },
  {
    "url": "/sw.js.map",
    "revision": "3c0cad0509d117f2737e837b406e3730"
  },
  {
    "url": "/workbox-e43f5367.js",
    "revision": "6dd14f6e5f8a63e9d186da86090b39cd"
  },
  {
    "url": "/workbox-e43f5367.js.map",
    "revision": "80e939e0172ea58fd4051670d6e82e75"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.strategies.CacheFirst({ "cacheName":"google-fonts-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 10, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.strategies.CacheFirst({ "cacheName":"google-fonts-static-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 10, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i, new workbox.strategies.CacheFirst({ "cacheName":"images-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 100, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\/api\/.*/i, new workbox.strategies.NetworkFirst({ "cacheName":"api-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 50, maxAgeSeconds: 86400, purgeOnQuotaError: false })] }), 'GET');
