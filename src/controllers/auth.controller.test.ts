import { disconnect } from 'mongoose'
import request from 'supertest'

import app from '../app'
import config from '../configs/general.config'
import { UserModel } from '../models/user.model'

const { CONTEXT_PATH } = config

afterAll(() => {
  disconnect()
})

const mockUser = {
  _id: 'pandorahid',
  name: 'Pandorah',
  email: 'pandorah@dark.com',
  password: 'password',
  createdAt: 'date.now',
  updatedAt: 'date.now'
}

describe('POST /auth/signup', () => {
  const user = {
    name: 'Pandorah',
    email: 'pandorah@dark.com',
    password: 'password'
  }
  UserModel.create = jest.fn().mockReturnValue(mockUser)

  it('should register a user', async () => {
    UserModel.findOne = jest.fn().mockReturnValueOnce(null)

    const res = await request(app)
      .post(`${CONTEXT_PATH}/auth/signup`)
      .send(user)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).not.toHaveProperty('password')
  })
  it('should not create a user and throw an error when email is not unique', async () => {
    UserModel.findOne = jest.fn().mockReturnValueOnce(user)

    const res = await request(app)
      .post(`${CONTEXT_PATH}/auth/signup`)
      .send(user)
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('status')
    expect(res.body).toHaveProperty('message')
  })
})
