import type { Request } from 'express'
import jwt from 'jsonwebtoken'

import config from '../configs/general.config'

const { JWT_SECRET } = config

const createToken = (payload: string | object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: 60 * 60
  })
}

const decodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

const isJwtPayload = (
  decoded: string | jwt.JwtPayload
): decoded is jwt.JwtPayload => {
  return !!decoded && typeof decoded === 'object' && '_id' in decoded
}

const isJwtError = (error: unknown): error is jwt.VerifyErrors => {
  return !!error && typeof error === 'object' && 'message' in error
}

export { createToken, decodeToken, isJwtPayload, isJwtError }
