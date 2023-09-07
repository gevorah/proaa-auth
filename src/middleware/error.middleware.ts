import type { NextFunction, Request, Response } from 'express'

import HttpError from '../models/http.error'
import logger from '../utils/logger'

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = err
  logger.error(message)
  res.status(status).send({ status, message })
}

export default errorHandler
