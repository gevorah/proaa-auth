import request from 'supertest'

import app from '../../src/app'
import config from '../../src/configs/general.config'
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

describe('The Home Routes', () => {
  describe('GET /', () => {
    it('should return api description', async () => {
      const res = await request(app).get(`${CONTEXT_PATH}/`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('version')
    })
  })
})
