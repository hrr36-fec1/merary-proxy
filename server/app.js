const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const cors = require('cors');

let app = express();
let port = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(`${__dirname}/../proxy_client/`)));

app.use(function(req, res, next) {
  // allow CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});



app.get('/api/movies/banner', (req, res) => {
  let options = {
    hostname: '127.0.0.1',
    port: 8081,
    path: `/api/movies/banner`,
    method: 'GET',
    json: true,
    uri: `http://127.0.0.1:8081/api/movies/banner`,
  };
  request(options, (err, response, body) => {
    if(err) console.log(err);
    res.json(body);
  });
});
module.exports = app;


