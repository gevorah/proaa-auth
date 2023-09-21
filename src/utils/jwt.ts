import type { Request } from 'express'
import jwt from 'jsonwebtoken'

import config from '../configs/general.config'

const { JWT_SECRET } = config

type Payload = string | object

const createToken = (payload: Payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: 60 * 60
  })
}

const decodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
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

export { createToken, decodeToken, isJwtPayload, isJwtError }
export type { PrivateReq }
