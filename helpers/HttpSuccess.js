const HttpSuccess = (status, code, message) => {
  const successMessage = { status, code, message }
  return successMessage
}
// const HttpErr = (status, message) => {
//   const error = new Error(message)
//   error.status = status
//   return error
// }

module.exports = HttpSuccess
