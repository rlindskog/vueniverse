import blacklist from 'express-jwt-blacklist'
import { compose } from 'compose-middleware'
import jwt from 'express-jwt'
{{#if_eq session 'redis'}}import redis from 'redis'{{/if_eq}}

{{#if_eq session 'redis'}}
// redis persisted store.
const client = redis.createClient(process.env.SESSION_PORT, process.env.SESSION_HOST)
client.auth(process.env.SESSION_PASSWORD, error => { if (error) throw error })

// https://github.com/layerhq/express-jwt-blacklist
blacklist.configure({
  tokenId: 'jti',
  store: {
    type: 'redis',
    client,
    keyPrefix: 'vueniverse:'
  }
})
{{/if_eq}}
{{#if_eq session 'in-memory'}}
// in-memory store
blacklist.configure({ tokenId: 'jti' })
{{/if_eq}}

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

const authErrors = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: { name: err.name, message: err.message, code: err.code } })
  } else {
    res.status(500).json({ error: err })
  }
}

function authenticate (options = {}) {
  return compose([jwtMiddleware(options), authErrors])
}

export default authenticate
