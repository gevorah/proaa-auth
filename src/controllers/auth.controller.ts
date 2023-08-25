import type { NextFunction, Request, Response } from 'express'

import HttpError from '../models/http.error'
import { UserReq, type UserRes } from '../models/user.dto'
import { UserModel } from '../models/user.model'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: UserReq = req.body
    const user = await UserModel.create({ ...data })
    data.password = user.password = undefined!
    const dto: UserRes = user
    res.status(201).json(dto)
  } catch (error) {
    next(new HttpError(500, `${error}`))
  }
}

const signIn = async (req: Request, res: Response) => {}

export { signUp, signIn }
