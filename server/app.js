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


//mine
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

//tyler
app.get('/api/movies/:movieId/reviews', (req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 4444,
    path: `/api/movies/${req.params.movieId}/reviews`,
    method: 'GET',
    json: true,
    uri: `http://127.0.0.1:4444/api/movies/${req.params.movieId}/reviews`,
  };
  request(options, (err, response, body) => {
    if (err) console.log(err);
    res.json(body);
  });
});

// britt
app.get('/api/movies/details/jurassic-park', (req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 3002,
    path: '/api/movies/details/jurassic-park',
    method: 'GET',
    json: true,
    uri: 'http://127.0.0.1:3002/api/movies/details/jurassic-park',
  };
  request(options, (err, response, body) => {
    if (err) console.log(err);
    res.json(body);
  });
});

// bill
app.get('/api/movies/:movie_slug/trailers', (req, res) => {
  console.log(req.params.movie_slug);
  const options = {
    hostname: '127.0.0.1',
    port: 3333,
    path: `/api/movies/${req.params.movie_slug}/trailers`,
    method: 'GET',
    json: true,
    uri: `http://127.0.0.1:3333/api/movies/${req.params.movie_slug}/trailers`,
  };
  request(options, (err, response, body) => {
    if (err) console.log(err);
    res.json(body);
  });
});

module.exports = app;


