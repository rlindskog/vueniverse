import * as axios from 'axios'

let options = {}

// if it's the server build, hit the local IP
// if it's the broser build, hit the URL.
if (process.SERVER_BUILD) {
  // options.baseURL = `http://${process.env.API_HOST}:${process.env.API_PORT}/api`
  // options.baseURL = process.env.PAGE_URL
  options.baseURL = 'http://localhost:3000/api'
  // options.baseURL = 'http://127.0.0.1:3000/api'
} else if (process.BROWSER_BUILD) {
  options.baseURL = '/api'
}

export default axios.create(options)
