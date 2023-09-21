import request from 'supertest'

import app from '../../src/app'
import config from '../../src/configs/general.config'
import User from '../../src/models/user.model'
import { clearDb, closeDb, connectDb } from '../utils/db'
import { user } from '../utils/user'

const { CONTEXT_PATH } = config

describe('The Auth Routes', () => {
  beforeAll(() => {
    return connectDb()
  })
  afterEach(() => {
    return clearDb()
  })
  afterAll(() => {
    return closeDb()
  })

  describe('POST /auth/signup', () => {
    it('should register a user', async () => {
      const res = await request(app)
        .post(`${CONTEXT_PATH}/auth/signup`)
        .send(user)
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).not.toHaveProperty('password')
    })

    it('should not create a user and throw an error when email is not unique', async () => {
      await User.create(user)

      const res = await request(app)
        .post(`${CONTEXT_PATH}/auth/signup`)
        .send(user)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
    })
  })

  describe('POST /auth/signin', () => {
    beforeEach(() => {
      return User.create(user)
    })

    it('should resolve sign-in', async () => {
      const res = await request(app)
        .post(`${CONTEXT_PATH}/auth/signin`)
        .send(user)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
    })

    it('should fail sign-in attempt and throw an error when user is not found', async () => {
      user.email = 'pandorah@fail.com'

      const res = await request(app)
        .post(`${CONTEXT_PATH}/auth/signin`)
        .send(user)
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
    })

    it('should fail sign-in attempt and throw an error when password is invalid', async () => {
      user.password = 'fail'

      const res = await request(app)
        .post(`${CONTEXT_PATH}/auth/signin`)
        .send(user)
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
    })
  })

  describe('GET /auth/verify', () => {
    it('should resolve token validation', async () => {
      await User.create(user)
      const token = await request(app)
        .post(`${CONTEXT_PATH}/auth/signin`)
        .send(user)
        .then(res => {
          return res.body.token
        })

      const res = await request(app)
        .get(`${CONTEXT_PATH}/auth/verify`)
        .set({ Authorization: 'Bearer ' + token })
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('_id')
    })

    it('should throw an error when empty authorization header', async () => {
      const res = await request(app).get(`${CONTEXT_PATH}/auth/verify`)
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
    })

    it('should throw an error when unauthorized token', async () => {
      const res = await request(app)
        .get(`${CONTEXT_PATH}/auth/verify`)
        .set({ Authorization: 'Basic token' })
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
    })

    it('should throw an error when invalid token', async () => {
      const res = await request(app)
        .get(`${CONTEXT_PATH}/auth/verify`)
        .set({ Authorization: 'Bearer token' })
      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
    })
  })
})
