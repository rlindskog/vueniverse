import argon2 from 'argon2'
import blacklist from 'express-jwt-blacklist'
import randId from '~util/randId'
import User from './models'
import uuidV4 from 'uuid/v4'
import jwt from 'jsonwebtoken'

const SECRET = randId()
const TENANT = randId()

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
      console.log(authorizedQueries.includes(req.query.check))
      if (authorizedQueries.includes(req.query.check)) {
        let check = req.query.check
        let data = req.query.data
        let user = await User.find({ [check]: data })
        if (user.length) {
          console.log(data + ' exists!!!')
          res.json({ exists: true })
        } else {
          console.log(data + ' doesn\'t exist!!!')
          res.json({ exists: false })
        }
      } else {
        res.json({ message: 'Query not supported.' })
      }
    } catch (error) {
      res.status(500).json(error)
    }
      // if (req.query.usernameExists) {
      //   let username = req.query.usernameExists
      //   let user = await User.find({ username })
      //   if (user.length) {
      //     res.json({ exists: true })
      //   } else {
      //     res.json({ exists: false })
      //   }
      // } else if (req.query.emailExists) {
      //   let email = req.query.emailExists
      //   let user = await User.find({ email })
      //   if (user.length) {
      //     res.json({ exists: true })
      //   } else {
      //     res.json({ exists: false })
      //   }
      // }
    //   res.json({ message: 'No authorized query present.' })
    // } catch (error) {
    //   res.status(500).json({ error })
    // }
  }
}

export const username = {
  async get (req, res) {
    try {
      // check if the logged in user has the same username as the requested user.
      if (req.user._doc.username === req.params.username) {
        delete req.user._doc.password
        // send over information with bots
        res.json(req.user._doc)
      }
      let fetchedUser = await User.findOne({ username: req.params.username })
      res.json({
        username: fetchedUser.username,
        message: `Authentication by ${req.params.fetchedUser.username} required to view more...`
      })
    } catch (error) {
      res.status(500).json({ error: 'something went wrong.' })
    }
  },
  async post (req, res) {
    res.json({ message: 'Update the user, and return the updated user.' })
  },
  async delete (req, res) {
    res.json({ message: 'Delete the user, and return the deleted user' })
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
        // eventually generate secret and aud for multi-tenancy. also think about using the crypto module instead.
        let token = jwt.sign(user, process.env.SECRET, {
          expiresIn: '30 days',
          jwtid: uuidV4(),
          audience: TENANT
        })
        let resUser = user.toObject()
        delete resUser.password
        res.status(200).json({
          message: 'Enjoy your token!',
          token,
          user: resUser
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
      if (req.user) {
        blacklist.revoke(req.user)
        res.json({ message: 'Token revoked, user successfully signed out.' })  
      } else {
        res.json({ message: 'Not signed in.' })
      }
    } catch (error) {
      // TODO: Handle different mongoose error codes acordingly instead of catch all
      res.status(500).json(error)
    }
  }
}
