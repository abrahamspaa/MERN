var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
	
const mongoose = require('mongoose');
 
mongoose.connect(
  'mongodb://localhost:27017/postcode', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, 
  err => {
    if (!err) {
      console.log('Successfully Established Connection with MongoDB')
    } else {
      console.log(`Failed to Establish Connection with MongoDB with Error: ${err}`)
    }
  }
);
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postCodeRouter = require('./routes/postcode');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/postcode', postCodeRouter);

module.exports = app;
