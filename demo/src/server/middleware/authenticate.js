import blacklist from 'express-jwt-blacklist'
import { compose } from 'compose-middleware'
import jwt from 'express-jwt'


// in-memory store
blacklist.configure({ tokenId: 'jti' })

const jwtMiddleware = function (options) {
  return jwt({
    secret: process.env.SECRET,
    isRevoked: blacklist.isRevoked,
    getToken: function fromCookiesHeadersQueryBody (req) {
      // Priority order.: Cookies, headers (Authorization: Bearer <token>), query, then body.
      if (req.cookies && req.cookies.token) {
        return req.cookies.token
      } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        console.log('Headers method.')
        return req.headers.authorization.split(' ')[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      } else if (req.body && req.body.token) {
        return req.body.token
      }
      return null
    },
    ...options
  })
}

const authErrors = function (error, req, res, next) {
  if (error.name === 'UnauthorizedError') {
    res.status(401).json({ name: error.name, message: error.message })
  } else {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}

function authenticate (options = {}) {
  return compose([jwtMiddleware(options), authErrors])
}

export default authenticate
