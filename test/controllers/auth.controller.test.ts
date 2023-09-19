import type { Request, Response } from 'express'

import { signIn, signUp, verify } from '../../src/controllers/auth.controller'
import type { PrivateReq } from '../../src/middleware/auth.middleware'
import { SignInError } from '../../src/models/auth.error'
import { user } from '../utils/user'

jest.mock('../../src/models/user.model', () => ({
  create: jest.fn(),
  findOne: jest.fn()
}))

jest.mock('bcrypt', () => ({
  compare: jest.fn()
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}))

describe('The Auth Controller', () => {
  const req = (data?: unknown) => ({ body: data }) as Request

  const res = {
    json: jest.fn(),
    status: jest.fn(() => res)
  } as unknown as Response

  const next = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Sign Up', () => {
    it('should return a user', async () => {
      const User = require('../../src/models/user.model')
      const modelUser = { ...user, password: undefined }
      User.create.mockResolvedValue(modelUser)

      await signUp(req(user), res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(modelUser)
    })
  })

  describe('Sign In', () => {
    it('should resolve sign-in', async () => {
      const User = require('../../src/models/user.model')
      const modelUser = {
        ...user,
        comparePassword: jest.fn().mockResolvedValue(true)
      }
      User.findOne.mockResolvedValue(modelUser)

      await signIn(req(user), res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    it('should fail sign-in attempt and throw an error when user is not found', async () => {
      const User = require('../../src/models/user.model')
      User.findOne.mockResolvedValue(null)

      await signIn(req(user), res, next)

      expect(next).toHaveBeenCalledWith(expect.any(SignInError))
      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
    })

    it('should fail sign-in attempt and throw an error when password is invalid', async () => {
      const User = require('../../src/models/user.model')
      const modelUser = {
        ...user,
        comparePassword: jest.fn().mockResolvedValue(false)
      }
      User.findOne.mockResolvedValue(modelUser)

      await signIn(req(user), res, next)

      expect(next).toHaveBeenCalledWith(expect.any(SignInError))
      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
    })
  })

  describe('Verify', () => {
    it('should return a jwt payload', async () => {
      const req = { payload: {} } as PrivateReq

      await verify(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(req.payload)
    })
  })
})
