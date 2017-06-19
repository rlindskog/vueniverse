import { Router } from 'express'
import authenticate from '~middleware/authenticate'
import {
  index,
  username,
  signIn,
  signOut,
  check
} from './controllers'

const router = Router()

router.get('/', authenticate(), index.get)
router.post('/', index.post)

// meant for sign-up
router.get('/check', check.get)

router.post('/sign-in', signIn.post)
router.post('/sign-out', authenticate(), signOut.post)

router.route('/:username')
  .all(authenticate())
  .get(username.get)
  .post(username.post)
  .delete(username.delete)
// TODO: add ability for user to delete their own profile.
// router.get('/:username', authenticate, authErrors, username.get)
// router.post('/:username', authenticate, authErrors, username.post)
// router.delete('/:username', authenticate, authErrors, username.delete)

export default router
