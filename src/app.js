const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast')

//  Define paths for express config
const publicDirectoryPath = path.join(__dirname, '/../public');
const viewPath = path.join(__dirname, '/../templates/views');
const partialsPath = path.join(__dirname, '/../templates/partials');

// Setup handlebars engine and wievs location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'koga briga'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: ':P'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'fuck you',
        message: 'Ovo je neka porukica'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, data = {}) => {
            forecast(data.longitude, data.latitude, (error, forecastData ) => {
                if(error) {
                    return res.send({
                        adderrorress: 'Forecast error',
                    })
                }
                return res.send({
                    'Data': forecastData
                })
            });
        })
    }
})

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'There is no search query'
//         })
//     }

//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'fuck you',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather',
        name: 'fuck you',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})