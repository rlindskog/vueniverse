import * as axios from 'axios'

let options = {}

// if it's the server build, request from the local IP
if (process.server) {
  options.baseURL = `http://${process.env.HOST}:${process.env.PORT}/api`
} else if (process.browser) {
  options.baseURL = '/api'
}

export default axios.create(options)
