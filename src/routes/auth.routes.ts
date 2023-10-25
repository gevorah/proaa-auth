import { Router } from 'express'

import { signIn, signUp, verify } from '../controllers/auth.controller'
import { fbLogin } from '../controllers/facebook.controller'
import { userExists, verifyToken } from '../middleware/auth.middleware'
import { facebookAuth } from '../middleware/facebook.middleware'

const router = Router()

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     token:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       name: Authorization
 *       description: Bearer token
 *       in: header
 *   responses:
 *     Error:
 *       description: failed operation
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HttpError'
 */

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [ Auth ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDto'
 *       required: true
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       default:
 *         $ref: '#/components/responses/Error'
 */
router.post('/signup', [userExists], signUp)

/**
 * @openapi
 * definitions:
 *   SignIn:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *   Token:
 *     required:
 *       - token
 *     properties:
 *       token:
 *         type: string
 */

/**
 * @openapi
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [ Auth ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/SignIn'
 *       required: true
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Token'
 *       default:
 *         $ref: '#/components/responses/Error'
 */
router.post('/signin', signIn)

/**
 * @openapi
 * /facebook:
 *   post:
 *     summary: Log in a user with facebook
 *     tags: [ Auth ]
 *     parameters:
 *       - $ref: '#/components/securitySchemes/token'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Token'
 *       default:
 *         $ref: '#/components/responses/Error'
 */
router.post('/facebook', [facebookAuth], fbLogin)

/**
 * @openapi
 * /verify:
 *   get:
 *     summary: Verify the token
 *     tags: [ Auth ]
 *     parameters:
 *       - $ref: '#/components/securitySchemes/token'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: string
 *                 iat:
 *                   type: integer
 *                 exp:
 *                   type: integer
 *       default:
 *         $ref: '#/components/responses/Error'
 */
router.get('/verify', [verifyToken], verify)

export default router
