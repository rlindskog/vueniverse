import blacklist from 'express-jwt-blacklist'
import stripUser from '~util/stripUser'
import { ServerError } from '~middleware/express-server-error'
import User from '../users/models'
import { promisify } from 'util'

export const index = {
  async get (req, res) {
    res.json({ message: 'Welcome to the admin API.' })
  }
}

export const users = {
  async get (req, res) {
    try {
      let { sortBy, descending, page, rowsPerPage } = req.query
      // set a default sortBy to username
      sortBy = sortBy && sortBy.length ? sortBy : 'username'
      // change vuetify descending method (boolean) into mongoose method (-1, 0, 1)
      if (descending === true) descending = -1
      else if (descending === false) descending = 1
      else descending = -1
      // turn query that should be numbers into numbers
      page = parseInt(page)
      rowsPerPage = parseInt(rowsPerPage)
      // check to see if rowsPerPage is set to all, which is notated by -1.
      let users
      if (rowsPerPage !== -1) {
        let paginateFrom = page * rowsPerPage - rowsPerPage
        let paginateTo = page * rowsPerPage
        users = await User.find({})
        .sort({ [sortBy]: descending })
        .skip(paginateFrom)
        .limit(paginateTo)
      } else {
        // if rowsPerPage is set to 'all' (-1), don't wory about pagination.
        users = await User.find({}).sort({ [sortBy]: descending })
      }
      let total = await User.count({})
      if (!users) throw new ServerError('No users exist at this moment.', { status: 404 })
      res.json({ users, total })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

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
      let { username } = req.query
      let user = await User.findOne({ username })
      let sub = user.id
      // We will use purge to blacklist ALL of the users (sub) tokens
      // Alternatively, you can use .revoke to blacklist 1 token, but you must somehow have access to the jtw
      // Also, because we don't have access to the expiration time, we must set it ourselves to now.
      // // node-jsonwebtoken uses this to calculate exp, let's use it too.
      await purge({ sub }, Math.floor(Date.now() / 1000))
      res.json({ message: 'Token successfully revoked.' })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
