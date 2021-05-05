require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')
const { HttpCode } = require('./helper/constants')
const rateLimit = require('express-rate-limit')
const boolParser = require('express-query-boolean')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 5 requests
  handler: (req, res, next) => {
    return res.status(HttpCode.MANY_REQUEST).json({
      status: 'error',
      code: HttpCode.MANY_REQUEST,
      message: 'Too many requests',
    })
  },
})
app.use(limiter)
app.use(cors())
app.use(express.json())
app.use(boolParser())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(HttpCode.SERVER_ERROR).json({ message: err.message })
})

module.exports = app
