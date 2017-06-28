import argon2 from 'argon2'
import blacklist from 'express-jwt-blacklist'
import User from './models'
import uuidV4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import stripUser from '~util/stripUser'
import randId from '~util/randId'

export const index = {
  async get (req, res) {
    try {
      let users = await User.find({})
      res.json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  async post (req, res) {
    try {
      let { username, email, firstName, lastName, password1, password2 } = req.body
      if (password1 === password2) {
        // if this is an update to a password or permission, blacklist.purge(req.user)
        let password = await argon2.hash(password1)
        let newUser = new User({ username, email, firstName, lastName, password })
        let savedUser = await newUser.save()
        res.json(savedUser)
      }
    } catch (error) {
      // TODO: Handle different mongoose error codes acordingly instead of catch all
      res.status(500).json(error)
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
        if (user.length) {
          res.json({ exists: true })
        } else {
          res.json({ exists: false })
        }
      } else {
        res.json({ message: 'Query not supported.' })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export const username = {
  async get (req, res) {
    try {
      // check if the logged in user has the same username as the requested user.
      if (req.user.username === req.params.username) {
        // send over information with bots
        res.json(req.user)
      } else {
        let fetchedUser = await User.findOne({ username: req.params.username })
        res.json({
          username: fetchedUser.username,
          message: `Authentication by ${req.params.fetchedUser.username} required to view more...`
        })
      }
    } catch (error) {
      res.status(500).json({ error: 'something went wrong.' })
    }
  },
  async post (req, res) {
    res.json({ message: 'Update the user, and return the updated user.' })
  },
  async delete (req, res) {
    try {
      if (req.user.username === req.params.username) {
        await User.findOneAndRemove({ username: req.user.username })
        res.json({ message: 'Successfully deleted user.' })
      } else {
        res.status(401).json({ message: 'Unauthorized.' })
      }
    } catch (error) {
      res.status(500).json({ error: 'something went wrong.' })
    }
  }
}

// separate into auth app if need be.
export const signIn = {
  async post (req, res) {
    try {
      let { username, password } = req.body
      let user = await User.findOne({ username })
      let passwordHash = user.password
      let matched = await argon2.verify(passwordHash, password)
      if (!user) {
        res.status(404).json({
          error: 'Authentication failed, can\'t find user'
        })
        throw Error({ code: 404, error: 'Authentication failed, can\'t find user' })
      } else if (!matched) {
        throw Error({ code: 404, message: 'Authntication failed. Wrong password' })
      } else {
        user = stripUser(user)
        let token = jwt.sign(user, process.env.SECRET, {
          expiresIn: '30 days',
          jwtid: randId()
        })
        res.status(200).json({
          message: 'Enjoy your token!',
          token,
          user
        })
      }
    } catch (error) {
      // TODO: Handle different mongoose error codes acordingly instead of catch all
      res.status(500).json(error)
    }
  }
}

export const signOut = {
  async post (req, res) {
    try {
      blacklist.revoke(req.user)
      res.json({ message: 'Token revoked, user successfully signed out.' })
    } catch (error) {
      // TODO: Handle different mongoose error codes acordingly instead of catch all
      res.status(500).json(error)
    }
  }
}
