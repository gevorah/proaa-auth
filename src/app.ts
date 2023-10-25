import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import config from './configs/general.config'
import morganLogger from './configs/morgan.config'
import { openapiSpecification } from './configs/swagger.config'
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

app.get('/swagger.json', (_req, res) => res.json(openapiSpecification))
app.use(
  `${CONTEXT_PATH}/swagger-ui`,
  swaggerUi.serve,
  swaggerUi.setup(undefined, { swaggerOptions: { url: '/swagger.json' } })
)

app.use(errorHandler)

export default app
