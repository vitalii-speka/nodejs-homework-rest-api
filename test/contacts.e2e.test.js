const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User, contacts, newContact } = require('../model/__mocks__/data')

require('dotenv').config()

// const { HttpCode } = require('../helper/constants')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User._id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')

describe('Testing get all contacts', () => {
  it('Get all contacts success should return 200 status', async () => {
    const res = await request(app).get('/api/contacts').set('Authorization', `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body.data.contacts).toBeInstanceOf(Array)
  })
  //   test('run function with right subscrioption', () => {
  //     subscription(Subscription.PRO)(req, res, next)
  //     expect(next).toHaveBeenCalled()
  //   })
  //   test('run function with wrong subscrioption ', () => {
  //     const result = subscription(Subscription.BUSINESS)(req, res, next)
  //     expect(result.status).toEqual('error')
  //     expect(result.code).toEqual(HttpCode.FORBIDDEN)
  //     expect(result.message).toEqual('Access is denied')
  //   })
})
