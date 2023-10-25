import type { Request, Response } from 'express'

const home = async (req: Request, res: Response) => {
  res.status(200).json({
    title: 'PROAA Auth API',
    description: 'Welcome to PROAA Auth API',
    version: 'v1'
  })
}

export { home }
