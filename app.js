var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var errorHandler = require('./errors');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes.welcome);
app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);
app.use('/api/setup', routes.setup);

// catch 404 and forward to error handler
app.use(errorHandler.notFoundError);

// error handler
app.use(errorHandler.internalServerError);

module.exports = app;
