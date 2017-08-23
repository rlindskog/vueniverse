import express from 'express'
import mongoose from 'mongoose'
import { Nuxt } from 'nuxt'

import apiRoutes from './api'
let config = require('../../nuxt.config')

const app = express()

// Import API Routes
app.use('/api', apiRoutes)

// Start nuxt.js
async function start () {
  // Import and Set Nuxt.js options
  config.dev = !(process.env.NODE_ENV === 'production')
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  // Add nuxt.js middleware
  app.use(nuxt.render)
}

// setup the database connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL)

// app.listen(process.env.PORT, process.env.HOST)
// console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`)

start()

export default app
// 1st and walker downtown.