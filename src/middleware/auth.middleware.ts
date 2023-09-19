import type { NextFunction, Request, Response } from 'express'
import jwt, { type JwtPayload, type VerifyCallback } from 'jsonwebtoken'

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

type PrivateReq = Request & {
  payload: jwt.JwtPayload
}

const isJwtPayload = (
  decoded: string | jwt.JwtPayload
): decoded is jwt.JwtPayload => {
  return !!decoded && typeof decoded === 'object' && 'id' in decoded
}

const isJwtError = (error: unknown): error is jwt.VerifyErrors => {
  return !!error && typeof error === 'object' && 'message' in error
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  if (!authorization) return next(new HttpError(401, 'JWT token is missing'))

  const [bearer, token] = authorization.split(' ')
  if (bearer.toLowerCase() !== 'bearer')
    return next(new HttpError(401, 'Unauthorized token'))

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    if (!isJwtPayload(decoded))
      return next(new HttpError(401, 'Unauthorized token'))

    const payload = ((req as PrivateReq).payload = decoded)

    const user = await User.findById(payload.id, {
      password: 0
    })
    if (!user) return next(new HttpError(401, 'No user found'))

    next()
  } catch (error) {
    if (isJwtError(error)) next(new HttpError(401, error.message))
  }
}

export { userExists, verifyToken }
export type { PrivateReq }
