import type { Request, Response } from 'express'

import { fbLogin } from '../../src/controllers/facebook.controller'
import HttpError from '../../src/models/http.error'
import { user } from '../utils/user'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}))

describe('The Facebook Controller', () => {
  const req = (user?: unknown) => ({ user }) as Request

  const res = {
    json: jest.fn(),
    status: jest.fn(() => res)
  } as unknown as Response

  const next = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Facebook Login', () => {
    it('should resolve facebook login', async () => {
      await fbLogin(req(user), res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should fail facebook login attempt and throw an error when user is not found', async () => {
      await fbLogin(req(), res, next)

      expect(next).toHaveBeenCalledWith(expect.any(HttpError))
      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
    })
  })
})
