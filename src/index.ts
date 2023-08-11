import logger from './utils/logger'
import { HOST, PORT } from './configs/general.config'
import app from './app'

app.listen(PORT, () => {
  logger.info(`Server is up and running on http://${HOST}:${PORT}/`)
})
