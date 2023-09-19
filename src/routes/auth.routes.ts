import { Router } from 'express'

import { signIn, signUp, verify } from '../controllers/auth.controller'
import { userExists, verifyToken } from '../middleware/auth.middleware'

const router = Router()

router.post('/signup', [userExists], signUp)
router.post('/signin', signIn)
router.get('/verify', [verifyToken], verify)

export default router
