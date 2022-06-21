const path = require("path");
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const express = require("express");

const app = express();
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handelbars engine and views section
app.set("view engine", 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: 'Weather-App',
    name: 'kushal sankhe'
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: 'About ME',
    name: 'kushal sankhe'
  });
});

app.get('/help', (req, res) => {
  res.render("help", {
    title: 'Help!',
    name: 'kushal bhai'
  });
});

app.get("/weather", (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render("404", {
    title: '404',
    errorMessage: 'Help article  not found!',
    name: 'Kushal Sankhe'
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: '404',
    name: 'kushal sankhe',
    errorMessage: 'Page not found'
  })
})
app.listen(port, () => {
  console.log("server is up on port "+port);
});
