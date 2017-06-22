import dotenv from 'dotenv'
dotenv.config({
  silent: true,
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
})

// TODO: add env variables into backpack config instead with webpack.DefinePlugin
// see nuxt config...
