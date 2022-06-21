const express = require('express');
const path = require('path');
const logger = require('morgan');
const { connectZooKeeper } = require('./helpers/zooKeeper');

const indexRouter = require('./routes/index');

connectZooKeeper();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
