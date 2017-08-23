import { Router } from 'express'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import usersRoutes from './users/routes'
import adminRoutes from './admin/routes'
import listEndpoints from 'express-list-endpoints'
import authenticate from '~/middleware/authenticate'
import { handleServerErrors } from '~/middleware/express-server-error'

const router = Router()

router.use(urlencoded({ extended: false }))
router.use(json())
router.use(cookieParser())

router.use('/', handleServerErrors)
router.use('/users', usersRoutes)
router.use('/admin', authenticate({ role: 'admin' }), adminRoutes)

router.get('/', (req, res) => {
  res.json(listEndpoints(router))
})

export default router
