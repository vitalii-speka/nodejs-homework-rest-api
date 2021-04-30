require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/contacts')
const userRouter = require('./routes/users')
const { HttpCode } = require('./helper/constants')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', userRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(HttpCode.SERVER_ERROR).json({ message: err.message })
})

module.exports = app
