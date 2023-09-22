import { Router } from 'express'

import { signIn, signUp, verify } from '../controllers/auth.controller'
import { fbLogin } from '../controllers/facebook.controller'
import { userExists, verifyToken } from '../middleware/auth.middleware'
import { facebookAuth } from '../middleware/facebook.middleware'

const router = Router()

router.post('/signup', [userExists], signUp)

router.post('/signin', signIn)
router.post('/facebook', [facebookAuth], fbLogin)

router.get('/verify', [verifyToken], verify)

export default router
