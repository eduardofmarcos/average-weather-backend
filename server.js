const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const server = app.listen(process.env.PORT_SERVER, () => {
  console.log(`Listening on port ${process.env.PORT_SERVER}...`);
});

//********************** Unhandled Rejections - Start **********************/

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down the application...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('Sigterm received: Shutting down gracefully!');
  server.close(() => {
    console.log('Process terminated!');
  });
});

//********************** Unhandled Rejections - End **********************/
