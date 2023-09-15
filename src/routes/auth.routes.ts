import { Router } from 'express'

import { signIn, signUp } from '../controllers/auth.controller'
import { userExists } from '../middleware/auth.middleware'

const router = Router()

router.post('/signup', [userExists], signUp)
router.post('/signin', signIn)

export default router
