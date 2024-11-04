require("dotenv").config(); // Load environment variables
var createError = require('http-errors');
var express = require('express');
var connectDB = require("./config/db"); // Import the database connection function
var fileBasedLoader = require("./config/file_based_db"); // Import the file_based_db function
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

// Database connect
if (process.env.DATABASE_OPTION == "server") {
    console.log("Database Server connection:")
    connectDB();    // Connect to Database: MongoDB
}
else if (process.env.DATABASE_OPTION == "file_based") {
    console.log("File based Data is loading:")
    var fileBasedData = new fileBasedLoader(path.join(__dirname, process.env.FILE_BASED_DATA_DIR));
}

// Reuire Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');

// Site entry point
const config = require('./config')();
process.env.PORT = config.port;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Register Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Resgiter API Endpoint
/*... TODO ...*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
