require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
})
const MongoClient = require('mongodb').MongoClient

async function removeAdmin (username = 'admin') {
  try {
    let db = await MongoClient.connect(process.env.DB_URL)
    await db.collection('users').remove({ username })
    console.log('Successfully removed admin.')
    await db.close()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

removeAdmin()
