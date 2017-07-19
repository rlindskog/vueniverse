import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import mongoose from 'mongoose'
import Nuxt from 'nuxt'

import config from '../../nuxt.config'
import apiRoutes from './api'

const app = express()

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cookieParser())

// Import API Routes
app.use('/api', apiRoutes)

// https://github.com/nuxt/express/tree/master/template
// Start nuxt.js
async function start () {
  config.dev = !(process.env.NODE_ENV === 'production')
  const nuxt = new Nuxt(config)
  app.use(nuxt.render)
  app.listen(process.env.PORT, process.env.HOST)
  console.log(`API listening at http://${process.env.HOST}:${process.env.PORT}/api`) // eslint-disable-line no-console
}

// setup the database connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL)

start()

export default app
