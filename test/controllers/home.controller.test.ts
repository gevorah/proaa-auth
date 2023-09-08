import type { Request, Response } from 'express'

import { home } from '../../src/controllers/home.controller'

describe('The Home Controller', () => {
  it('should return description', async () => {
    const req = {} as Request
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    } as unknown as Response

    await home(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })
})
