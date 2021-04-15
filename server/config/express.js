const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, _next) {
  res.status(500);
  res.render('error', { error: err });
}

app.use(clientErrorHandler);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.set("port", process.env.PORT || 3001);

module.exports = app;