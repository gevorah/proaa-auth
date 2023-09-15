import { Router } from 'express'

import { signIn, signUp, verifyToken } from '../controllers/auth.controller'
import { userExists } from '../middleware/auth.middleware'

const router = Router()

router.post('/signup', [userExists], signUp)
router.post('/signin', signIn)
router.get('/verify', verifyToken)

export default router
