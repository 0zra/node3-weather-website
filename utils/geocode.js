const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnVjay15b3UiLCJhIjoiY2p4bjgwdWg4MGIyejNlbXZja3RkZmppOSJ9._6EWlM7tZKW4vqnyyuKTAg&limit=1`

  request({ url, json: true}, (error, response) => {
    if(error) {
      callback('Unable to connect to geolocation service!', undefined);
    } else if(response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode;