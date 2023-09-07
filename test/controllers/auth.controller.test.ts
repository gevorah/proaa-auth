import type { Request, Response } from 'express'

import { signUp } from '../../src/controllers/auth.controller'
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

const user = {
  name: 'Pandorah',
  email: 'pandorah@dark.com',
  password: 'password'
}

describe('The Auth Controller', () => {
  describe('Sign Up', () => {
    it('should register a user', async () => {
      const req = { body: user } as Request
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
      } as unknown as Response
      const next = (err?: any) => {}

      await signUp(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalled()
    })
  })
})
