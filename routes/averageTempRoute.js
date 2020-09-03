const express = require('express')
const averageTempController = require('../controllers/averageTempController')

//initalizing router from express
const router = express.Router()

router.get(
  '/getforecast/:lat/:lng/:month',
  averageTempController.getAverageTemp
)

module.exports = router
