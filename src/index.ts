import app from './app'
import config from './configs/general.config'
import { connectDb } from './configs/mongo.config'
import logger from './utils/logger'

const { HOST, PORT } = config

connectDb()

app.listen(PORT, () => {
  logger.info(`Server is up and running on http://${HOST}:${PORT}/`)
})
