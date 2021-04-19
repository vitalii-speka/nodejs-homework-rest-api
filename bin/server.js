const mongoose = require('mongoose')
const app = require('../app')

const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })

async function start() {
  try {
    await mongoose.connect('mongodb+srv://vitaliiSpeka:vitall1987@clustershw.e3xi6.mongodb.net/contacts', {
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
