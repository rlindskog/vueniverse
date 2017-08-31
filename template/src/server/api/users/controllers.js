import bcrypt from 'bcryptjs'
import blacklist from 'express-jwt-blacklist'
import User from './models'
import jwt from 'jsonwebtoken'
import stripUser from '~util/stripUser'
import randId from '~util/randId'
import { ServerError } from '~middleware/express-server-error'

export const index = {
  async get (req, res) {
    try {
      let users = await User.find({})
      if (!users) throw new ServerError('No users exist at this moment.', { status: 404 })
      res.json(users)
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    try {
      let { username, email, firstName, lastName, password1, password2 } = req.body
      if (password1 === password2) {
        let password = await bcrypt.hash(password1, 10)
        let newUser = new User({ username, email, firstName, lastName, password })
        let savedUser = await newUser.save()
        res.json({ message: `Thanks for signing up, ${savedUser.username}!` })
      } else {
        throw new ServerError('Passwords don\'t match.', { status: 400 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const check = {
  async get (req, res) {
    try {
      let authorizedQueries = ['username', 'email']
      if (authorizedQueries.includes(req.query.check)) {
        let check = req.query.check
        let data = req.query.data
        let user = await User.find({ [check]: data })
        if (user.length) res.json({ exists: true })
        else res.json({ exists: false })
      } else {
        throw new ServerError('Query not supported.', { status: 400 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const username = {
  async get (req, res) {
    try {
      // check if the logged in user has the same username as the requested user.
      if (req.user.username === req.params.username) {
        res.json(req.user)
      } else {
        let fetchedUser = await User.findOne({ username: req.params.username })
        if (!fetchedUser) throw new ServerError(`User with username '${req.params.username}' doesn't exist.`, { status: 404 })
        res.json({
          username: fetchedUser.username,
          message: `Authentication by ${req.params.fetchedUser.username} required to view more...`
        })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    res.json({ message: 'Update the user, and return the updated user.' })
  },
  async delete (req, res) {
    try {
      if (req.user.username === req.params.username) {
        let deleted = await User.findOneAndRemove({ username: req.user.username })
        if (!deleted) throw new ServerError(`User with username '${req.params.username}' doesn't exist.`, { status: 404 })
        res.json({ message: 'Successfully deleted user.' })
      } else {
        throw new ServerError('Unauthorized.', { status: 401 })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

// separate into auth app if need be. 'sign-up' is handled as a POST request to '/users'
export const signIn = {
  async post (req, res) {
    try {
      let { username, password } = req.body
      let user = await User.findOne({ username })
      if (!user) throw new ServerError('Authentication failed. Incorrect username or password', { status: 401, log: false })
      let passwordHash = user.password
      let matched = await bcrypt.compare(password, passwordHash)      
      if (!user || !matched || !username || !password) {
        throw new ServerError('Authentication failed. Incorrect username or password', { status: 401, log: false })
      } else {
        user = stripUser(user)
        let token = jwt.sign(user, process.env.SECRET, { expiresIn: '30 days', jwtid: randId() })
        res.status(200).json({ message: `Welcome, ${user.username}!`, token, user })
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const signOut = {
  async post (req, res) {
    try {
      blacklist.revoke(req.user)
      res.json({ message: 'Sign out successful. Good bye! :)' })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
