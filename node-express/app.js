var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var entries = require('./routes/entries');

var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'aa171dlwksarfbw.cagxvqgtc5mi.us-west-2.rds.amazonaws.com',
	user     : 'steven',
	password : 'asiaventure',
	port     : 3306,
	database : 'ebdb'
    });


connection.connect(function(err){
	if(err){
	    console.log('Error connecting to Db', err);
	    return;
	}
	console.log('Connection established');
    });

connection.query('SELECT * FROM blog_entries',function(err,rows){
	if(err) throw err;

	console.log('Data received from Db:\n');
	console.log(rows);
    });

app.get('/first', entries.first);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
