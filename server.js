require('es6-promise').polyfill()
require('isomorphic-fetch')

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const withAuth = require('./middleware')
const Board = require('./models/board')

app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next()
  } else {
    require('./mongo')().then(() => next())
  }
})

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  expressSession({
    secret: process.env.secret || 'keyboard cat',
    saveUninitialized: false,
    resave: false,
  }),
)

const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user')
const LocalStrategy = require('passport-local').Strategy

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username }, function(err, user) {
      console.log(user)
      if (err) return done(err)
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Invalid username/password' })
      }
      return done(null, user)
    })
  }),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((user, done) => {
  User.findById(user.id, function(err, user) {
    done(err, user)
  })
})

app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.set('port', process.env.PORT || 3001)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }

  return response
}

function parseJSON(response) {
  return response.json()
}

app.get('/', (req, res) => {
  console.log('route handler ' + res)
  res.send('Hello')
})

app.get('/checkForCurrentUser', withAuth, (req, res) => {
  res.status(200).send()
})

// app.get('/:user', (req, res, next) => {
//   let username = req.params.name
//   let user = User.findById(user.id)
//   console.log('user ' + user)
//   res.json(user)
// })

app.post(
  '/login',
  function(req, res, next) {
    console.log(req.body)
    console.log('================')
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.user)
    res.cookie('user', req.user.username)
    var info = {
      user: req.user,
      redirect: `/${req.user.username}`,
      boards: req.user.boards,
    }
    res.json(info)
  },
)

app.post('/register', (req, res, next) => {
  let { username, password } = req.body
  let activeBoard = new Board({ name: 'New Board', lists: [] })
  activeBoard.save((err, board) => {
    if (err) console.log(err)
  })
  let boards = [activeBoard]
  let user = new User({
    username,
    password,
    activeBoard: activeBoard._id,
    boards,
  })

  user.save((err, user) => {
    req.login(user, function(err) {
      console.log(user)
      if (err) {
        console.log(err)
        return next(err)
      }
      res.cookie('user', req.user.username)
      var info = {
        user: req.user,
        redirect: `/${req.user.username}`,
        boards: req.user.boards,
      }
      res.json(info)
    })
  })
})

app.post('/logout', (req, res) => {
  req.logOut()
  res.clearCookie('user')
  res.clearCookie('connect.sid')
  res.json({ loggedOut: true })
})

app.post('/createBoard', (req, res, next) => {
  let board = new Board({ name: 'New Board', lists: [] })
  board.save((err, board) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    console.log('board ' + board)
    res.status(200).json(board)
  })
})

function errorHandler(err, req, res, next) {
  console.error('Error: ', err.stack)
  res.status(err.response ? err.response.status : 500)
  res.json({ error: err.message })
}

app.use(errorHandler)

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`)
})
