import type { NextFunction, Request, Response } from 'express'

import HttpError from '../models/http.error'
import type { UserDto } from '../models/user.dto'
import User from '../models/user.model'

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email }: UserDto = req.body

  const user = await User.findOne({ email })
  if (!user) next()

  const message = `An account with the email address ${email} already exists.`
  next(new HttpError(400, message))
}

export { userExists }
