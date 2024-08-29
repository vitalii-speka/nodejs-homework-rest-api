const createError = require('http-errors')
const express = require('express')
const path = require('path')
const fs = require('fs').promises
const formidable = require('docs/additional_materials/additional-work-with-files/formidable')

const app = express()
const uploadDir = path.join(process.cwd(), 'uploads')
const storeImage = path.join(process.cwd(), 'images')

const parseFrom = (form, req) => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      resolve({ fields, files })
    })
  })
}

app.post('/upload', async (req, res, next) => {
  const form = formidable({ uploadDir, maxFileSize: 2 * 1024 * 1024 })
  const { fields, files } = await parseFrom(form, req)
  const { path: temporaryName, name } = files.picture
  const { description } = fields
  const fileName = path.join(storeImage, name)
  try {
    await fs.rename(temporaryName, fileName)
  } catch (err) {
    await fs.unlink(temporaryName)
    return next(err)
  }
  res.json({ description, message: 'Файл успішно завантажено', status: 200 })
})

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ message: err.message, status: err.status })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  createFolderIsNotExist(uploadDir)
  createFolderIsNotExist(storeImage)
  console.log(`Server running. Use on port:${PORT}`)
})
