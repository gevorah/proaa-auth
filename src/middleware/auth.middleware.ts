import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import config from '../configs/general.config'
import HttpError from '../models/http.error'
import type { UserDto } from '../models/user.dto'
import User from '../models/user.model'

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email }: UserDto = req.body

  const user = await User.findOne({ email })
  if (!user) return next()

  const message = `An account with the email address ${email} already exists.`
  next(new HttpError(400, message))
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  if (!authorization) return next(new HttpError(401, 'JWT token is missing'))

  const [bearer, token] = authorization.split(' ')
  if (bearer.toLowerCase() !== 'bearer')
    return next(new HttpError(401, 'Unauthorized token'))

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    res.status(200).json(decoded)
    next()
  } catch (error) {
    const { message } = error as jwt.VerifyErrors
    next(new HttpError(401, message))
  }
}

export { userExists, verifyToken }
