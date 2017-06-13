import blacklist from 'express-jwt-blacklist-updated'
import { compose } from 'compose-middleware'
import jwt from 'express-jwt'

// blacklist
// https://github.com/layerhq/express-jwt-blacklist
blacklist.configure({
  tokenId: 'jti'
  // strict: true,
  // store: {
  //   type: 'memcached',
  //   host: '127.0.0.1',
  //   port: 11211,
  //   keyPrefix: 'mywebapp:',
  //   options: {
  //     timeout: 1000
  //   }
  // }
})

const jwtMiddleware = function (options) {
  return jwt({
    secret: process.env.SECRET,
    isRevoked: blacklist.isRevoked,
    getToken: function fromCookiesHeadersQueryBody (req) {
      // let token = req.cookies.token || req.headers['Authoritzation'] || req.query.token || req.body.token
      // Priority order.: Cookies, headers (Authorization: Bearer <token>), query, then body.
      if (req.cookies && req.cookies.token) {
        return req.cookies.token
      }
      // else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      //   console.log('Headers method.')
      //   return req.headers.authorization.split(' ')[1]
      // } else if (req.query && req.query.token) {
      //   return req.query.token
      // } else if (req.body && req.body.token) {
      //   return req.body.token
      // }
      return null
    },
    ...options
  })
}

const authErrors = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: { name: err.name, message: err.message, code: err.code } })
  } else {
    res.status(500).json({ error: err })
  }
}

function authenticate (options = {}) {
  return compose([jwtMiddleware(options) /* , authErrors */])
}

export default authenticate
