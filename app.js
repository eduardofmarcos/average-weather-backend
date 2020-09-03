const express = require('express')
const averageTempRoute = require('./routes/averageTempRoute')
const AppError = require('./utils/AppError')
const globalError = require('./controllers/errorController')
const allowCrossDomain = require('./utils/allowCrossDomain')
const compression = require('compression')

//initializing express
const app = express()

//allow cross domain requests
app.use(allowCrossDomain.allowCrossDomain)

//compression responses
app.use(compression())

//route for retrieve the forecast
app.use('/averagetemp', averageTempRoute)

//treating for non known requests routes
app.use('*', (req, res, next) => {
  next(new AppError('Can not find this route on this server :(', 400))
})

app.use(globalError)
module.exports = app
