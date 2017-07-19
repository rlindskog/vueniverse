import { Router } from 'express'
import {
  index
} from './controllers'

const router = Router()

router.get('/', index.get)

export default router
