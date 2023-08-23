import type { Request, Response } from 'express'

const home = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to PROAA Auth',
    name: 'proaa-auth',
    version: '0.0.0'
  })
}

export default home
