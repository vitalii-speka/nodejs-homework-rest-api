const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const fs = require('fs').promises
const { User, newUser } = require('../model/__mocks__/data')

require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User.id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')
// jest.mock('cloudinary')

describe('Testing the route api/users', () => {
  describe('should handle PATCH request', () => {
    test('should return 200 status for PATCH: /users/avatar', async done => {
      const buffer = await fs.readFile('./test/ava.jpg')
      const res = await request(app)
        .patch('/api/users/avatars')
        .set('Authorization', `Bearer ${token}`)
        .attach('avatar', buffer, 'ava.jpg')

      console.log('🚀 ~ file: users.e2e.test.js ~ line 23 ~ describe ~ res.error', res.error)
      console.log('🚀 ~ file: users.e2e.test.js ~ line 32 ~ describe ~ res.body.data', res.body.data)

      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.avatarUrl).toEqual('secure_url_cloudinary')
      done()
    })
  })

  describe('should handle POST request', () => {
    test('should return 200 POST: /api/users/register', async done => {
      const res = await request(app).post('/api/users/register').send(newUser)
      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
      done()
    })

    test('should return 409 status POST: /api/users/register email address has already been used', async done => {
      const res = await request(app).post('/api/users/register').send(newUser)
      console.log('🚀 ~ file: users.e2e.test.js ~ line 45 ~ describe ~ res', res.error)
      expect(res.status).toEqual(409)
      expect(res.body).toBeDefined()
      done()
    })

    test('should return 200 status POST: /api/users/login', async done => {
      const res = await request(app).post('/api/users/login').send(newUser)
      console.log('🚀 ~ file: users.e2e.test.js ~ line 53 ~ describe ~ res', res.error)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      done()
    })

    test('should return 401 status POST: /api/users/login', async done => {
      const res = await request(app).post('/api/users/login').send({ email: 'wrong@test.com', password: '123456' })
      expect(res.status).toEqual(401)
      expect(res.body).toBeDefined()
      done()
    })

    test('should return 204 logout POST: /api/users/logout', async done => {
      const res = await request(app).post('/api/users/logout').set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(204)
      expect(res.body).toBeDefined()
      done()
    })
  })
})
