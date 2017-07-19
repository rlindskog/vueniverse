const NowClient = require('now-client')
const { spawn } = require('child_process')
const secretsObj = require('../secrets.json')
const now = new NowClient()

// this script checks to your NOW account to see if it has any secrets saved that you have locally.
// if it does, it deletes them, and adds your secrets locally. It does this on each deployment to maintain fresh secrets.
// it will run a deployment in the shell.
async function deploy(secretsObj) {
  try {
    let currentSecrets = await now.getSecrets()
    currentSecrets = currentSecrets.map(item => item.name)
    let localSecrets = Object.keys(secretsObj).map(item => item.toLowerCase())
    for (let localSecret of localSecrets) {
      let found = currentSecrets.find(el => el === localSecret)
      if (found) await now.deleteSecret(localSecret)
      await now.createSecret(localSecret, secretsObj[localSecret.toUpperCase()])
    }
    // get env variable args, for example: $ now -e @secret -e @db_url
    let secretEnvArgs = Object.keys(secretsObj).reduce((args, secret) => {
      args.push('-e', `${secret.toUpperCase()}='@${secret.toLowerCase()}'`)
      return args
    }, [])
    spawn('now', secretEnvArgs, { shell: true, stdio: 'inherit' })
  } catch (error) {
    console.log(error)
  }
}

deploy(secretsObj)
