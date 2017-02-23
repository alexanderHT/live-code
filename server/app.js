var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
mongoose.Promise = global.Promise

// apa saja yang dibutuhkan untuk besok
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')

var index = require('./routes/index')
var users = require('./routes/users')
var letters = require('./routes/letters')
var dates = require('./routes/dates')

var app = express()

// setup cors
app.use(cors())

// setup database
mongoose.connect('mongodb://localhost/liveCode')

// required model user
var modelUser = require('./models/model.user')

// passport
passport.use('test-login', new LocalStrategy(function (usernameInput, passwordInput, done) {

  // loging username from database
  modelUser.findOne({ username: usernameInput }, function (err, data) {
    if (!data) {
      // if not found get data throw msg err
      done(null, false, {message: 'incorect username'})
    }else {
      // data ternyata ada neh bro
      if (passwordHash.verify(passwordInput, data.password)) {
        done(null, data)
      }else {
        // if password wrong throw msg err
        done(null, false, {message: 'incorect password'})
      }
    }
  })
}))

// passport serializeUser
passport.serializeUser(function (user, callback) {
  callback(null, user)
})

// passport initialize & session
app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/api/users', users)
app.use('/api/letters', letters)
app.use('/api/dates', dates)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
