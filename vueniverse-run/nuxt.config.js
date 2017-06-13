const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    API_HOST: process.env.API_HOST,
    API_PORT: process.env.API_PORT
  },
  srcDir: path.resolve(__dirname, 'src', 'client'),
  buildDir: 'dist/client', // for when support for this comes
  cache: true,
  head: {
    title: 'zenapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  css: [{ src: '~assets/style/app.styl', lang: 'styl' }],
  build: {
    vendor: ['vuetify', 'jwt-decode', 'axios']
  },
  router: {
    middleware: ['ssr-cookie']
  },
  plugins: ['~plugins/vuetify.js']
}
