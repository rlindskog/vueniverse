const secrets = require('../secrets.json')
const { spawn } = require('child_process')

let args = []
Object.keys(secrets).forEach(variable => {
  let arg = ['-e', `${variable}='${secrets[variable]}'`]
  args = args.concat(arg)
})

spawn('now', args, { shell: true, stdio: 'inherit' })
