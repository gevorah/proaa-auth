import app from './app'
import config from './configs/general.config'
import logger from './utils/logger'

const { HOST, PORT } = config

app.listen(PORT, () => {
  logger.info(`Server is up and running on http://${HOST}:${PORT}/`)
})
