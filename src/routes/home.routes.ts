import { Router } from 'express'

import { home } from '../controllers/home.controller'

const router = Router()

/**
 * @openapi
 * /:
 *   get:
 *     summary: Welcome to PROAA Auth API
 *     tags: [ Home ]
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 version:
 *                   type: string
 */
router.get('/', home)

export default router
