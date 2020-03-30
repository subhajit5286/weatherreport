const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'bd2f2027861889d97611624352cdae5e';
var PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText,weatherText1,weatherText2,weatherText3;
        weatherText = `${weather.name}`;
        weatherText1 = `${weather.sys.country} `;
        weatherText2 = `${weather.main.temp} degrees `;
        weatherText3 = `${weather.main.humidity} %`;
        weatherText4 = `${weather.wind.speed} m/sec!`;
        // let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}, Humidity:: ${weather.main.humidity} % ,
        // Country:: ${weather.sys.country} ,
        //  & Wind Speed is ${weather.wind.speed} m/sec! Have a nice day :)`;
        
        
        res.render('index',  {weather: weatherText,weather1: weatherText1,weather2: weatherText2,weather3: weatherText3,weather4: weatherText4, error: null});
        
      }
    }
  });
})

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})