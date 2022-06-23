const express = require('express');
const path = require('path');
const logger = require('morgan');
const createHttpError = require('http-errors');
const { connectZooKeeper } = require('./helpers/zooKeeper');
const indexRouter = require('./routes/index');
const rateLimiter = require('./middlewares/rateLimiter');

connectZooKeeper();

const app = express();

// Apply the rate limiting middleware to all requests
app.use(rateLimiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//* Catch HTTP 404
app.use((req, res, next) => {
  next(createHttpError(404));
});

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
