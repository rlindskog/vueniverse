import crypto from 'crypto'
export default (method = 'base64') => crypto.randomBytes(64).toString(method)
