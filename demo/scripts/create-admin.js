require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
})
const MongoClient = require('mongodb').MongoClient
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcryptjs')

async function createAdmin (username = 'remove-this-admin', email = 'admin@email.com') {
  try {
    let db = await MongoClient.connect(process.env.DB_URL)
    let rand = uuidv4().split('-').join('')
    let password = await bcrypt.hash(rand, 10)
    let admin = await db.collection('users').findOne({ username })
    if (admin) {
      await db.collection('users').updateOne({ username }, { password })
    } else {
      await db.collection('users').insertOne({ username, email, password, role: 'admin' })
    }
    console.log(`
      username: ${username}
      password: ${rand}
      Please sign in and create a new admin immediately. Delete this user when done.
    `)
    await db.close()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

createAdmin()
