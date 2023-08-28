import { Router } from 'express'

import { signUp } from '../controllers/auth.controller'
import { userExists } from '../middleware/auth.middleware'

const router = Router()

router.post('/signup', [userExists], signUp)

export default router
