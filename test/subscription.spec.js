const subscription = require('../helper/subscription')
const { HttpCode, Subscription } = require('../helper/constants')
const { User } = require('../model/__mocks__/data')

describe('Unit test: helper/subscrioption', () => {
  const req = { user: User }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(response => response),
  }
  const next = jest.fn()

  test('run function with right subscrioption', () => {
    subscription(Subscription.PRO)(req, res, next)
    expect(next).toHaveBeenCalled()
  })
  test('run function with wrong subscrioption ', () => {
    const result = subscription(Subscription.BUSINESS)(req, res, next)
    expect(result.status).toEqual('error')
    expect(result.code).toEqual(HttpCode.FORBIDDEN)
    expect(result.message).toEqual('Access is denied')
  })
})
