import { disconnect } from 'mongoose'
import request from 'supertest'

import app from '../app'
import config from '../configs/general.config'

const { CONTEXT_PATH } = config

afterAll(() => {
  disconnect()
})

describe('POST /auth/signup', () => {
  it('should register a user', async () => {
    const user = {
      name: 'Nate',
      email: 'nate@dark.com',
      password: 'password'
    }
    const res = await request(app)
      .post(`${CONTEXT_PATH}/auth/signup`)
      .send(user)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('_id')
  })
})

const signUpData = {
  name: 'Nate',
  email: 'nate@dark.com',
  _id: 'nateid',
  createdAt: Date.now().toString(),
  updatedAt: Date.now().toString()
}
