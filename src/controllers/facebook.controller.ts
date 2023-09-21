import type { NextFunction, Request, Response } from 'express'

import HttpError from '../models/http.error'
import type { User } from '../models/user.dto'
import { createToken } from '../utils/jwt'

const fbLogin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new HttpError(401, 'Failed login'))

  const token = createToken({ _id: (req.user as User)._id })
  res.status(200).json({ token })
  next()
}

export { fbLogin }
