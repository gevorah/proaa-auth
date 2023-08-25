import { Router } from 'express'

import { signUp } from '../controllers/auth.controller'
import { userExists } from '../middleware/user.middleware'

const router = Router()

router.post('/signup', [userExists], signUp)

export default router
