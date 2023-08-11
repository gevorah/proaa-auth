import express from 'express'
import cors from 'cors'
import morganMiddleware from './configs/morgan.config'

const app = express()

app.use(cors())
app.use(morganMiddleware)

app.get('/', (req, res) =>
  res.json({ method: req.method, message: 'Coming soon!', ...req.body })
)

export default app
