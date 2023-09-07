import request from 'supertest'

import app from '../../src/app'
import config from '../../src/configs/general.config'
import User from '../../src/models/user.model'
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

const { CONTEXT_PATH } = config

const mockUser = {
  _id: 'pandorahid',
  name: 'Pandorah',
  email: 'pandorah@dark.com',
  password: 'password',
  createdAt: 'date.now',
  updatedAt: 'date.now'
}

User.create = jest.fn().mockReturnValue(mockUser)

const user = {
  name: 'Pandorah',
  email: 'pandorah@dark.com',
  password: 'password'
}

describe('The Auth Routes', () => {
  describe('POST /auth/signup', () => {
    it('should register a user', async () => {
      User.findOne = jest.fn().mockReturnValueOnce(null)

      const res = await request(app)
        .post(`${CONTEXT_PATH}/auth/signup`)
        .send(user)
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).not.toHaveProperty('password')
    })
    it('should not create a user and throw an error when email is not unique', async () => {
      User.findOne = jest.fn().mockReturnValueOnce(user)

      const res = await request(app)
        .post(`${CONTEXT_PATH}/auth/signup`)
        .send(user)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
    })
  })
})
