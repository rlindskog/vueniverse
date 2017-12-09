import { ServerError } from 'express-server-error'

export default (attributes, blackList = ['createdAt', 'updatedAt', 'id', 'subject']) => {
  for (let item in attributes) {
    if (blackList.includes(item)) throw new ServerError(`Update on attribute '${item}' not permitted.`, { status: 403 })
  }
}
