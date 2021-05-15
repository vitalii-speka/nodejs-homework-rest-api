const guard = require('../helper/guard')
const { HttpCode } = require('../helper/constants')
const { User } = require('../model/__mocks__/data')
const passport = require('passport')

describe('Unit test: helper/guard', () => {
  const req = { get: jest.fn(header => `Bearer ${User.token}`), user: User }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(response => response),
  }
  const next = jest.fn()

  test('run guard with user', () => {
    passport.authenticate = jest.fn((authType, options, calback) => () => {
      calback(null, User)
    })
  })

  test('run guard without user', () => {
    passport.authenticate = jest.fn((authType, options, calback) => (res, req, next) => {
      calback(null, false)
    })
    guard(req, res, next)
    expect(req.get).toHaveBeenCalled()
    expect(req.status).toHaveBeenCalled()
    expect(req.json).toHaveBeenCalled()
    expect(req.json).toHaveReturnWith({
      status: 'error guardTest',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    })
  })

  test('run guard wrong user token', () => {
    passport.authenticate = jest.fn((authType, options, calback) => (res, req, next) => {
      calback(null, { token: null })
    })
    guard(req, res, next)
    expect(req.get).toHaveBeenCalled()
    expect(req.status).toHaveBeenCalled()
    expect(req.json).toHaveBeenCalled()
    expect(req.json).toHaveReturnWith({
      status: 'error guardTest',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    })
  })
})
