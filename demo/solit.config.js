const dotenv = require('dotenv')

dotenv.config({
  silent: true,
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
})

module.exports = {

}