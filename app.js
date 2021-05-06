require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const boolParser = require('express-query-boolean')

const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')
const { HttpCode } = require('./helper/constants')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(express.static('public'))

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
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: HttpCode.NO_CONTENT,
  }),
)

app.use(express.json({ limit: 100000 }))
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
