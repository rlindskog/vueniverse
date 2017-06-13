import { Router } from 'express'
import usersRoutes from './users/routes'
import adminRoutes from './admin/routes'
import botsRoutes from './bots/routes'
import listEndpoints from 'express-list-endpoints'
import authenticate from '~middleware/authenticate'
// import app from '../../server'
const router = Router()

// Add USERS Routes
router.use('/users', usersRoutes)
router.use('/bots', /* authenticate, */ botsRoutes) // required admin permissions...
router.use('/admin', authenticate, adminRoutes) // required admin permissions...

router.get('/', (req, res) => {
  res.json(listEndpoints(router))
})

export default router
