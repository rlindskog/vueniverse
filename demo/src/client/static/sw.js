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
    "url": "/_nuxt/0.nuxt.bundle.2f5bb32bb15a78154bff.js",
    "revision": "941b8fdad346a862d7640bd55df3e376"
  },
  {
    "url": "/_nuxt/1.nuxt.bundle.0bc94e3a058c8d3554bb.js",
    "revision": "5860acfd663e4445a3874f669dfc0d3b"
  },
  {
    "url": "/_nuxt/10.nuxt.bundle.29cb7d95322153dc50df.js",
    "revision": "eebc76625ccd4eea4361f58be05927a9"
  },
  {
    "url": "/_nuxt/2.nuxt.bundle.0e5bbc7866d334b851c4.js",
    "revision": "1ab2425aadd07186151c54ac3e7c7bf5"
  },
  {
    "url": "/_nuxt/3.nuxt.bundle.30348901fbc6776df626.js",
    "revision": "a6cee1690b298be19fee7f029d20d100"
  },
  {
    "url": "/_nuxt/4.nuxt.bundle.6b4401ae287cb8b0ef1d.js",
    "revision": "595dc7cda3f2ed51c2a3856756722844"
  },
  {
    "url": "/_nuxt/5.nuxt.bundle.de6368d40c3d7abf9943.js",
    "revision": "7217823f8b8bf934f1ef21a97b700288"
  },
  {
    "url": "/_nuxt/6.nuxt.bundle.d6470408189b83abdd7b.js",
    "revision": "d7d9717238ecf617f4daf2dbbed935f9"
  },
  {
    "url": "/_nuxt/7.nuxt.bundle.6b897fc953eca8473372.js",
    "revision": "fd3d3a8babc9746836f82d6447ee4e89"
  },
  {
    "url": "/_nuxt/8.nuxt.bundle.f9297ed4058000bea9e5.js",
    "revision": "11439eb328e937461a189ee458197a10"
  },
  {
    "url": "/_nuxt/9.nuxt.bundle.a06a13dd49ae84e6006a.js",
    "revision": "78c1f3be307a39352d72a49e38968b81"
  },
  {
    "url": "/_nuxt/client-manifest.json",
    "revision": "919fea7a1592ec3bf32c1525ed145775"
  },
  {
    "url": "/_nuxt/index.html",
    "revision": "744fb1c184ce0e85af057191b683d6a2"
  },
  {
    "url": "/_nuxt/manifest.30073268eed3b5a43231.js",
    "revision": "311d7dfdc51f285de427b259ea407973"
  },
  {
    "url": "/_nuxt/manifest.4b3ed768.json",
    "revision": "2c12d21be39de41ac687a78f99c0e614"
  },
  {
    "url": "/_nuxt/nuxt.bundle.d7ba4ac3946478b0ee00.js",
    "revision": "3ffeee661826164e55e9acf2f1db55dd"
  },
  {
    "url": "/_nuxt/server-bundle.json",
    "revision": "e95950cf147cb30ab0d24011819d0fa8"
  },
  {
    "url": "/_nuxt/vendor.bundle.fcd7286f2c82c15042bf.js",
    "revision": "59d1c97535f89643a9141270787309a1"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "vueniverse_1.0.0",
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute(/\/_nuxt\/.*/, workboxSW.strategies.cacheFirst());
workboxSW.router.registerRoute(/\/.*/, workboxSW.strategies.networkFirst());
