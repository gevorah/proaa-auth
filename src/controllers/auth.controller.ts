import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import config from '../configs/general.config'
import type { PrivateReq } from '../middleware/auth.middleware'
import { SignInError } from '../models/auth.error'
import HttpError from '../models/http.error'
import type { UserDto } from '../models/user.dto'
import User from '../models/user.model'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: UserDto = req.body

    const user = await User.create({ ...data })
    data.password = user.password = undefined!

    res.status(201).json(user)
  } catch (error) {
    next(new HttpError(500, `${error}`))
  }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return next(new SignInError())

    const matchPassword = await user.comparePassword(password)
    if (!matchPassword) return next(new SignInError())

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: 60 * 60
    })

    res.status(200).json({ token })
  } catch (error) {
    next(new HttpError(500, `${error}`))
  }
}

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const payload = (req as PrivateReq).payload
  res.status(200).json(payload)
  next()
}

export { signUp, signIn, verify }
