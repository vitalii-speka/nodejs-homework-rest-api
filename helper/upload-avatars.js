const multer = require('multer')
const path = require('path')

require('dotenv').config()
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    // console.log('upload helper')
    console.log('file.mimetype.includes', file.mimetype.includes('image'))
    if (file.mimetype.includes('image')) {
      // To accept the file pass `true`, like so:
      cb(null, true)
      return
    }

    // You can always pass an error if something goes wrong:
    const err = new Error('Загружен не файл изображения!')
    err.status = 400
    cb(err)
  },
})

module.exports = upload
