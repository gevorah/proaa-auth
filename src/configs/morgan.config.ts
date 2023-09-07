import morgan from 'morgan'

import logger from '../utils/logger'

const morganLogger = morgan(
  ':method :url :status :response-time ms - :res[content-length]', // dev
  //':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms', // short
  {
    stream: {
      write: message => logger.http(message)
    }
  }
)

export default morganLogger
