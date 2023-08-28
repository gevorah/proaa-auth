import cors from 'cors'
import express from 'express'

import config from './configs/general.config'
import morganLogger from './configs/morgan.config'
import errorHandler from './middleware/error.middleware'
import authRoutes from './routes/auth.routes'
import homeRoutes from './routes/home.routes'

const { CONTEXT_PATH } = config

const app = express()

app.use(cors())
app.use(morganLogger)
app.use(express.json())

app.use(`${CONTEXT_PATH}/`, homeRoutes)
app.use(`${CONTEXT_PATH}/auth`, authRoutes)
app.use(errorHandler)

export default app
