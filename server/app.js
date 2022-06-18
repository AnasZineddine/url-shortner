const express = require('express');
const path = require('path');
const logger = require('morgan');
const { connectZooKeeper } = require('./helpers/zooKeeper');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

connectZooKeeper();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
