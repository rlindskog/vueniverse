importScripts('workbox-sw.prod.v1.0.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/0.nuxt.bundle.b7a477ee1a8c71d92542.js",
    "revision": "0e3d2c57a6e040505036a65707dc01a3"
  },
  {
    "url": "/_nuxt/1.nuxt.bundle.4cfcf6aadd10483e687e.js",
    "revision": "d5593e3cbe57b50a4f5fdc9050ce96f2"
  },
  {
    "url": "/_nuxt/10.nuxt.bundle.b69c57bf4696fef79e4e.js",
    "revision": "14343c5a75da2af2c39e21e5cc67b1ec"
  },
  {
    "url": "/_nuxt/2.nuxt.bundle.f62f98801838e083f24f.js",
    "revision": "00e5e0edb29dc7a016afa7dc46b650c4"
  },
  {
    "url": "/_nuxt/3.nuxt.bundle.51bc283009a01667efc0.js",
    "revision": "ec4fd52a76e563f42b8e896633973d7e"
  },
  {
    "url": "/_nuxt/4.nuxt.bundle.2d01cb3cee4fa0a72bfc.js",
    "revision": "4d221d1a0aab4fea5fcc3931142ff1ee"
  },
  {
    "url": "/_nuxt/5.nuxt.bundle.837602247fb4b4023cb2.js",
    "revision": "b6daff970092abf35275cfb7fb4f98e7"
  },
  {
    "url": "/_nuxt/6.nuxt.bundle.ea63524368a585378ded.js",
    "revision": "b115b30062d73585af2db443bc780aa7"
  },
  {
    "url": "/_nuxt/7.nuxt.bundle.de2a97b93205754162d5.js",
    "revision": "c64d2f9969fa04342d6584e67da0272d"
  },
  {
    "url": "/_nuxt/8.nuxt.bundle.397641f33181da762441.js",
    "revision": "762f684971b7a889d9e58b2f35794a6c"
  },
  {
    "url": "/_nuxt/9.nuxt.bundle.27b03e6c724b07ff4476.js",
    "revision": "d1be06f40d649ba90bc830c81bbaab19"
  },
  {
    "url": "/_nuxt/client-manifest.json",
    "revision": "976fcaea64c5241e44a453768980111a"
  },
  {
    "url": "/_nuxt/index.html",
    "revision": "744fb1c184ce0e85af057191b683d6a2"
  },
  {
    "url": "/_nuxt/manifest.023650b2b31ea0704896.js",
    "revision": "22294708404fbe82e63e67ae3fe95742"
  },
  {
    "url": "/_nuxt/manifest.0cabf170.json",
    "revision": "cc6e663a388d9fb1e8d79c23b71a995b"
  },
  {
    "url": "/_nuxt/nuxt.bundle.44a993b60782121b5b5c.js",
    "revision": "06236e16fcf91f020176ce57709b4310"
  },
  {
    "url": "/_nuxt/vendor.bundle.86fee5c404a0bcbb352c.js",
    "revision": "4c2ea7cc0e16bd04559c708356542c5c"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "vueniverse_1.0.0",
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute(/\/_nuxt\/.*/, workboxSW.strategies.cacheFirst());
workboxSW.router.registerRoute(/\/.*/, workboxSW.strategies.networkFirst());
