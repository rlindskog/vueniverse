import blacklist from 'express-jwt-blacklist'
import { promisify } from 'util'
import Table from '~/generic/controllers/table'
import stripUser from '~/util/stripUser'
import { ServerError } from '~/middleware/express-server-error'
import User from '../users/models'

export const index = {
  async get (req, res) {
    res.json({ message: 'Welcome to the admin API.' })
  }
}

export const users = new Table(User, 'username')

export const username = {
  async put (req, res) {
    try {
      // expect a query, and change the specified items.
      res.json({ message: 'PUT: admin/user/username' })
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async get (req, res) {
    try {
      let fetchedUser = await User.findOne({ username: req.params.username })
      if (!fetchedUser) throw new ServerError(`User with username '${req.params.username}' doesn't exist.`, { status: 404 })
      fetchedUser = stripUser(fetchedUser)
      res.json(fetchedUser)
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async delete (req, res) {
    try {
      let deleted = await User.findOneAndRemove({ username: req.user.username })
      if (!deleted) throw new ServerError(`User with username '${req.params.username}' doesn't exist.`, { status: 404 })
      res.json({ message: 'Successfully deleted user.' })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

let purge = promisify(blacklist.purge)

export const revoke = {
  async post (req, res) {
    try {
      let username = req.params.username
      let user = await User.findOne({ username })
      let sub = user.id
      /*
      We will use purge to blacklist ALL of the users (sub) tokens
      Alternatively, you can use `blacklist.revoke` to blacklist 1 token, but you must 
      somehow have access to the jtw.
      Also, because we don't have access to the expiration time, we must set it ourselves to now.
      node-jsonwebtoken uses Math function this to calculate `exp`, let's use it too.
      */
      await purge({ sub }, Math.floor(Date.now() / 1000))
      res.json({ message: 'Token successfully revoked.' })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
