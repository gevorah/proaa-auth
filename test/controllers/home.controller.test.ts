import type { Request, Response } from 'express'

import { home } from '../../src/controllers/home.controller'
import { clearDb, closeDb, connectDb } from '../utils/db'

beforeAll(() => {
  return connectDb()
})
afterEach(() => {
  return clearDb()
})
afterAll(() => {
  return closeDb()
})

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
