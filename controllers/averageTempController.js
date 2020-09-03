const catchAsync = require('../utils/catchAsync')
const fetch = require('node-fetch')
const AppError = require('../utils/AppError')
const { urlencoded } = require('express')

exports.getAverageTemp = catchAsync(async (req, res, next) => {
  // params for fetching the stormglass api
  const params = 'airTemperature'

  // latitude and longitude and month retrieved from params
  const lat = req.params.lat
  const lng = req.params.lng
  const monthToSearch = req.params.month

  // defining the gap to search based in month

  // 2017
  const dateStart_1_2017 = `2017-${monthToSearch}-03`
  const dateEnd_1_2017 = `2017-${monthToSearch}-07`
  const dateStart_2_2017 = `2017-${monthToSearch}-17`
  const dateEnd_2_2017 = `2017-${monthToSearch}-21`
  const dateStart_3_2017 = `2017-${monthToSearch}-24`
  const dateEnd_3_2017 = `2017-${monthToSearch}-28`

  // 2018
  const dateStart_1_2018 = `2018-${monthToSearch}-03`
  const dateEnd_1_2018 = `2018-${monthToSearch}-07`
  const dateStart_2_2018 = `2018-${monthToSearch}-15`
  const dateEnd_2_2018 = `2018-${monthToSearch}-19`
  const dateStart_3_2018 = `2018-${monthToSearch}-24`
  const dateEnd_3_2018 = `2018-${monthToSearch}-28`

  // 2019
  const dateStart_1_2019 = `2019-${monthToSearch}-03`
  const dateEnd_1_2019 = `2019-${monthToSearch}-07`
  const dateStart_2_2019 = `2019-${monthToSearch}-15`
  const dateEnd_2_2019 = `2019-${monthToSearch}-19`
  const dateStart_3_2019 = `2019-${monthToSearch}-24`
  const dateEnd_3_2019 = `2019-${monthToSearch}-28`

  // urls to fetch

  //2017
  const url2017_1 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_1_2017}&end=${dateEnd_1_2017}`
  const url2017_2 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_2_2017}&end=${dateEnd_2_2017}`
  const url2017_3 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_3_2017}&end=${dateEnd_3_2017}`

  // console.log(url2017_1)
  // console.log(url2017_2)
  // console.log(url2017_3)

  //2018
  const url2018_1 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_1_2018}&end=${dateEnd_1_2018}`
  const url2018_2 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_2_2018}&end=${dateEnd_2_2018}`
  const url2018_3 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_3_2018}&end=${dateEnd_3_2018}`

  // console.log(url2018_1)
  // console.log(url2018_2)
  // console.log(url2018_3)

  //2019
  const url2019_1 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_1_2019}&end=${dateEnd_1_2019}`
  const url2019_2 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_2_2019}&end=${dateEnd_2_2019}`
  const url2019_3 = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${dateStart_3_2019}&end=${dateEnd_3_2019}`

  // console.log(url2019_1)
  // console.log(url2019_2)
  // console.log(url2019_3)

  // Promise.all to fetch all the urls and wait for the result of them at once
  Promise.all([
    fetch(url2017_1, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2017_2, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2017_3, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2018_1, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2018_2, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2018_3, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2019_1, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2019_2, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    }),
    fetch(url2019_3, {
      headers: {
        Authorization: process.env.STORM_WEATHER_API_KEY
      }
    })
  ])
    .then((responses) => {
      // get a JSON object from each of the responses
      return Promise.all(
        responses.map((response) => {
          return response.json()
        })
      )
    })
    .then((response) => {
      try {
        // initializing the 2017, 2018, 2019 sum
        let sum2017 = 0
        let sum2018 = 0
        let sum2019 = 0

        //console.log(response)
        // iteration and incrementing the sum variables - NOAA data
        response[0].hours.forEach((element) => {
          sum2017 = sum2017 + element.airTemperature.noaa
        })

        response[1].hours.forEach((element) => {
          sum2018 = sum2018 + element.airTemperature.noaa
        })

        response[2].hours.forEach((element) => {
          sum2019 = sum2019 + element.airTemperature.noaa
        })

        // calculating the average
        const average2017 = sum2017 / response[0].hours.length
        const average2018 = sum2018 / response[1].hours.length
        const average2019 = sum2019 / response[2].hours.length

        // console.log(average2017)
        // console.log(average2018)
        // console.log(average2019)

        const totalAverage = (average2017 + average2018 + average2019) / 3

        if (isNaN(average2017) || isNaN(average2018) || isNaN(average2019)) {
          return next(new AppError('Something went very wrong :(', 400))
        }

        // responding the request
        res.status(200).json({
          status: 'success',
          data: {
            geoLocation: {
              latitude: lat,
              longitude: lng
            },
            averageTemperature: {
              averageTemp: totalAverage + 0.0000000000001,
              unit: 'Celsius',
              month: monthToSearch
            }
          }
        })
      } catch (e) {
        console.log(e)
        next(new AppError('Something went very wrong :(', 400))
      }
    })

    .catch((error) => {
      console.log(error)
      // thow an error to global error middleware and create a new instance of AppError class to be treated by errorController.js
      next(new AppError('Something went very wrong :(', 400))
    })
})
