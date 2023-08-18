import { connect } from 'mongoose'

import HttpError from '../models/http.error'
import logger from '../utils/logger'
import config from './general.config'

try {
  await connect(config.MONGO_URI, {
    user: config.MONGO_USER,
    pass: config.MONGO_PASS
  })
  logger.info('Successfully connected to the database.')
} catch (error) {
  const message = `Error establishing a database connection. ${error}`
  throw new HttpError(500, message)
}
