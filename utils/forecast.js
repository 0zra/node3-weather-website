const request = require('request');

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/e65f4ff1ca28a20dd7297fe26c5d85fa/${lat},${long}?units=si`

  request({ url, json: true}, (error, response) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined);
    } else if(response.body.error) {
      callback('Unable to find location!', undefined);
    } else {
      
      callback(undefined, {
        summary: response.body.currently.summary,
        precipProbability: response.body.currently.precipProbability,
        precip: response.body.currently.precipType
      })
    }
  })
}

module.exports = forecast;