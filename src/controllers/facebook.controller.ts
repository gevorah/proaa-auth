import type { NextFunction, Request, Response } from 'express'
import HttpError from 'src/models/http.error'

const fbLogin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new HttpError(401, 'Failed login'))
  res.status(200).json(req.user)
  next()
}

export { fbLogin }
