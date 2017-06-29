import { Router } from 'express'
import usersRoutes from './users/routes'
import adminRoutes from './admin/routes'
import listEndpoints from 'express-list-endpoints'
import authenticate from '~middleware/authenticate'
import { handleServerErrors } from '~middleware/express-server-error'

const router = Router()

router.use('/', handleServerErrors)
router.use('/users', usersRoutes)
router.use('/admin', authenticate(), adminRoutes)

router.get('/', (req, res) => {
  res.json(listEndpoints(router))
})

export default router
