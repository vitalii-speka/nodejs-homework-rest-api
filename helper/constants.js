const Subscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
}

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  MANY_REQUEST: 429,
  SERVER_ERROR: 500,
}

module.exports = {
  Subscription,
  HttpCode,
}
