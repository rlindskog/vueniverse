importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "vueniverse",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.1812d784930d0b5d6f55.js",
    "revision": "e92323ebbdf2299705cc53a0867bd6c8"
  },
  {
    "url": "/_nuxt/common.2e1df8362a3588c792d8.js",
    "revision": "e61030866cf5f757a544b68ee153491b"
  },
  {
    "url": "/_nuxt/common.ecd7653b200128a160de7ccfd44ecd26.css",
    "revision": "a898429f41b79517ffdd5a6176c6ebb1"
  },
  {
    "url": "/_nuxt/layouts/default.0493c3dc1cd663a68108.js",
    "revision": "287778f18a670871aff997238e761dd9"
  },
  {
    "url": "/_nuxt/manifest.6eab22fe4df0262e2171.js",
    "revision": "ebed4c17afaff7c3db2acb173991e346"
  },
  {
    "url": "/_nuxt/pages/admin/index.0664cdaab4dbb9eda8ad.js",
    "revision": "e8eddd6e4baa5e9be8a81c65cd548ab7"
  },
  {
    "url": "/_nuxt/pages/index.88336639e29415c8b046.js",
    "revision": "84e6537fde48878a0eb94658a10db43a"
  },
  {
    "url": "/_nuxt/pages/users/_username/index.47a7175f7d3116341c50.js",
    "revision": "bce5c8cc2bb23223b44b3e467ff84c12"
  },
  {
    "url": "/_nuxt/pages/users/auth/index.bf30ad03821bb0cf6923.js",
    "revision": "8ccda021f227fc67fee597f1a1ec0dea"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-in.b973293ad7a460155f4b.js",
    "revision": "029599384316b4b81148bb6316c081cf"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-out.fb596fd7ecf29c2a32ff.js",
    "revision": "25179788a5d8aa29ff8abd03e0711614"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-up.380f30f98f2239b1d043.js",
    "revision": "25685cfd5f5a42bf465eb8fd7f8daa2a"
  },
  {
    "url": "/_nuxt/pages/users/index.4b2e16022197d881d690.js",
    "revision": "b1d4f98712ae946628a1520e977e4ac6"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

