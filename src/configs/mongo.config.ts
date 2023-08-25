import { connect } from 'mongoose'

import HttpError from '../models/http.error'
import logger from '../utils/logger'
import config from './general.config'

const { MONGO_URI, MONGO_USER, MONGO_PASS } = config

const mongoConnect = async () => {
  try {
    await connect(MONGO_URI, {
      user: MONGO_USER,
      pass: MONGO_PASS
    })
    logger.info('Successfully connected to the database.')
  } catch (error) {
    const message = `Error establishing a database connection. ${error}`
    throw new HttpError(500, message)
  }
}

export { mongoConnect }
