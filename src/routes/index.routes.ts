import { Router } from 'express'

const router = Router()

router.get('/', (req, res) =>
  res.json({
    message: 'Welcome to PROAA Auth',
    name: 'proaa-auth',
    version: '0.0.0'
  })
)

export default router
