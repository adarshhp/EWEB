var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var admin = require('./routes/admin');
var hbs=require('express-handlebars');
var app = express();
var fileupload=require('express-fileupload');
var db=require('./config/connection');
var session=require('express-session');
//const {connectToDb, getDb} = require('./config/connection')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());
app.use(session({secret:"key",cookie:{maxAge:60000}}))
//db.connect()
db.connect((err)=>{
  if(err) console.log("error"+err);
  else console.log("connected");
})

//i added it here
/*
let db;
connectToDb((err) => {
    if(!err){
       console.log('app is listening')
       db=getDb()
    }
})*/


app.use('/', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
