const path = require('path')

const dotenv = require('dotenv')

dotenv.config({
  silent: true,
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
})

module.exports = {
  webpack: (config, options, webpack) => {
    options.env = process.env.NODE_ENV || 'development'
    config.entry.main = path.resolve(__dirname, 'src', 'server', 'index.js')
    config.output.path = path.resolve(__dirname, 'dist', 'server')
    config.resolve.alias = {
      '~/middleware': path.resolve(__dirname, 'src', 'server', 'middleware'),
      '~/util': path.resolve(__dirname, 'src', 'server', 'util'),
      '~/generic': path.resolve(__dirname, 'src', 'server', 'generic'),
      '~/': path.resolve(__dirname, 'src', 'server')
    }
    return config
  }
}
