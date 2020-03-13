let request = require('request');

let apiKey = 'bd2f2027861889d97611624352cdae5e';
let city = 'kolkata,IN';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
  }
});