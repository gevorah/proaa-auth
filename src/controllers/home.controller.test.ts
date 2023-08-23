import { disconnect } from 'mongoose'
import request from 'supertest'

import app from '../app'
import config from '../configs/general.config'

const { CONTEXT_PATH } = config

afterAll(() => {
  disconnect()
})

describe('GET /', () => {
  it('should return api description', async () => {
    const res = await request(app).get(`${CONTEXT_PATH}/`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('version')
  })
})
