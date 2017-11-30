importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "vueniverse",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.cecb39a0d99cfdba1406.js",
    "revision": "15bb8a8792788d39789e577e5870a6dc"
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
    "url": "/_nuxt/layouts/default.edb2dfc580ff5f6f70ed.js",
    "revision": "4070d53f78f7a1cb4f530b02c43b8231"
  },
  {
    "url": "/_nuxt/manifest.d39bfaee3acfebfe691d.js",
    "revision": "d13377e9904d2805d8627dc56437e9f1"
  },
  {
    "url": "/_nuxt/pages/admin/index.fa9d94c75f27660dae33.js",
    "revision": "60502e10a776d072ef3496780e9f9a41"
  },
  {
    "url": "/_nuxt/pages/index.11ce42dc99f780abb8b4.js",
    "revision": "9a112881bb73be52c19eea54ba7dfd6e"
  },
  {
    "url": "/_nuxt/pages/users/_username/index.29fe490fce1564651dab.js",
    "revision": "49b16ba75e6ec2b05a671851499ad502"
  },
  {
    "url": "/_nuxt/pages/users/auth/index.fecd84e78a96cb79d53a.js",
    "revision": "4ae2b79655d85e461afbfbc0638fb7ca"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-in.70a2a6b378bb72026413.js",
    "revision": "d6ca21843847b09aaa807701c08e5783"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-out.b5e2c0dbde3084a13fab.js",
    "revision": "7ccb8c2249d42fcb2a8fd97154d4608f"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-up.9797ab97536de80bb408.js",
    "revision": "4cee38b663e9ded925ef5ebe4d234dd6"
  },
  {
    "url": "/_nuxt/pages/users/index.65c54fb940d8315c052b.js",
    "revision": "7a0ee105542d7c901c55745bd6a53a9e"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

