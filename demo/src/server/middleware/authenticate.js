import blacklist from 'express-jwt-blacklist'
import { compose } from 'compose-middleware'
import { ServerError } from '~/middleware/express-server-error'
import jwt from 'express-jwt'
import redis from 'redis'

// redis persisted store.
const client = redis.createClient(process.env.SESSION_PORT, process.env.SESSION_HOST)
if (process.env.NODE_ENV === 'production') {
  client.auth(process.env.SESSION_PASSWORD, error => { if (error) throw error })
}

// https://github.com/layerhq/express-jwt-blacklist
blacklist.configure({
  tokenId: 'sub',
  indexBy: 'jti',
  store: {
    type: 'redis',
    client,
    keyPrefix: 'vueniverse:'
  }
})

const jwtMiddleware = jwtOptions => jwt({
  secret: process.env.SECRET,
  isRevoked: blacklist.isRevoked,
  getToken: function fromCookiesHeadersQueryBody (req) {
    // Priority order: Cookies, headers (Authorization: Bearer <token>), query, then body.
    if (req.cookies && req.cookies.token) {
      return req.cookies.token
    } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token
    } else if (req.body && req.body.token) {
      return req.body.token
    }
    return null
  },
  ...jwtOptions
})

const roleMiddleware = role => (req, res, next) => {
  if (role) {
    let authorized = true
    if (Array.isArray(role)) {
      authorized = role.includes(req.user.role)
    } else if (typeof role === 'string') {
      authorized = role === req.user.role
    }
    if (!authorized) {
      next(new ServerError('Insufficient Permissions', { name: 'InsufficientPermissions', status: 401 }))
    } else {
      next()
    }
  } else {
    next()
  }
}

const authErrors = (error, req, res, next) => {
  if (error.name === 'UnauthorizedError') {
    res.status(401).json({ name: error.name, message: error.message })
  } else {
    res.handleServerError(error)
  }
}

function authenticate (options = {}) {
  return compose([
    jwtMiddleware(options.jwt || {}),
    roleMiddleware(options.role),
    authErrors
  ])
}

export default authenticate
