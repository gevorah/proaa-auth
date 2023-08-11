import logger from '../utils/logger'
import morgan from 'morgan'

const morganMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  //':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: message => logger.http(message)
    }
  }
)

export default morganMiddleware
