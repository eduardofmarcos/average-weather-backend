const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './config.env' })

const port = process.env.PORT_SERVER || 3000

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

//********************** Unhandled Rejections - Start **********************/

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down the application...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('Sigterm received: Shutting down gracefully!')
  server.close(() => {
    console.log('Process terminated!')
  })
})

//********************** Unhandled Rejections - End **********************/
