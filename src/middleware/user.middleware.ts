import type { NextFunction, Request, Response } from 'express'

import HttpError from '../models/http.error'
import User from '../models/user.model'

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    const message = `An account with the email address ${email} already exists.`
    next(new HttpError(400, message))
  }
  next()
}

export { userExists }
