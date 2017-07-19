import * as axios from 'axios'

let options = {}

// if it's the server build, request from the local IP
if (process.SERVER_BUILD) {
  options.baseURL = `http://${process.env.HOST}:${process.env.PORT}/api`
} else if (process.BROWSER_BUILD) {
  options.baseURL = '/api' // if you handle page rendering and the API on the different servers, you must specify the API url.
}

export default axios.create(options)
