import { Router } from 'express'
import {
  index,
  users,
  username,
  revoke
} from './controllers'

const router = Router()

router.get('/', index.get)
router.get('/users', users.get)
router.post('/users/:username/revoke', revoke.post)
router.route('/users/:username')
  .post(username.put)
  .get(username.get)
  .put(username.put)
  .delete(username.delete)

export default router
