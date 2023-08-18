import type { NextFunction, Request, Response } from 'express'

import HttpError from '../models/http.error'
import User from '../models/user.model'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    const pojo = user.toObject()
    const dto: Omit<typeof pojo, 'password'> = pojo
    res.status(201).json(dto)
  } catch (error) {
    next(new HttpError(500, `${error}`))
  }
}

const signIn = async (req: Request, res: Response) => {}

export { signUp, signIn }
