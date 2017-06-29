import mongoose from 'mongoose'
import argon2 from 'argon2'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  firstName: String,
  lastName: String,
  password: {
    type: String,
    require: true,
    minlength: 5
  },
  admin: {
    type: Boolean,
    default: false,
    require: true
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

userSchema.pre('save', async function (callback) {
  if (!this.isModified('password')) return callback()
  this.password = await argon2.hash(this.password)
  callback()
})

// don't ever return password on creation.
userSchema.set('toJSON', {
  transform (doc, ret, options) {
    delete ret.password
    return ret
  }
})

export default User
