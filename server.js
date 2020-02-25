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
const List = require('./models/list')
const Card = require('./models/card')

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
  let boards = [activeBoard]
  let activeBoardId = activeBoard.id
  activeBoard.save((err, board) => {
    if (err) console.log(err)
  })

  let user = new User({
    username,
    password,
    activeBoard: activeBoardId,
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
        user: user,
        redirect: `/${user.username}`,
        boards: user.boards,
        activeBoard: activeBoardId,
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

app.delete('/deleteBoard', (req, res, next) => {
  let board = req.body['board']
  console.log('delete board ' + board)

  Board.findById(board, err => {
    if (err) {
      console.log(err)
      res.status(401).json({ error: err })
    }
    User.find({ username: req.cookies['user'] }, (err, user) => {
      console.log('jser ' + user[0].boards)
      if (err) {
        console.log(err)
        res.status(401).json({ error: err })
      }
      let index = user[0].boards.indexOf(board)
      user[0].boards.splice(index, 1)
      user[0].save(err => {
        if (err) {
          console.log(err)
          res.status(401).json({ error: err })
        }
        Board.findByIdAndDelete(board, err => {
          if (err) console.log(err)
          console.log('hoooray ' + board)
          res.status(200).json(user[0])
        })
      })
    })
  })
})

app.post('/createList', (req, res, next) => {
  console.log('hi')
  let list = new List({ name: '', cards: [] })
  let activeBoard = req.body['activeBoard']
  let username = req.cookies['user']
  console.log('activeBoard ' + JSON.stringify(req.body))

  list.save((err, list) => {
    console.log('hello')
    if (err) {
      alert('goodbye')
      console.error(err)
      return next(err)
    }
    Board.findById(activeBoard, (err, board) => {
      console.log('191 ' + board)
      board.lists.push(list)
      board.save((err, board) => {
        if (err) {
          console.log('goodbye')
          console.error(err)
          return next(err)
        }
        User.find({ username: username }, (err, user) => {
          console.log('user ' + JSON.stringify(user[0].boards[0]._id))
          console.log(JSON.stringify(board._id))
          if (err) {
            alert('goodbye')
            console.error(err)
            return next(err)
          }
          let oldBoard = user[0].boards.filter(json => {
            return JSON.stringify(json._id) == JSON.stringify(board._id)
          })[0]

          console.log('oldBOard ' + JSON.stringify(oldBoard))
          let oldBoardIndex = user[0].boards.indexOf(oldBoard)

          user[0].boards.splice(oldBoardIndex, 1, board)

          console.log('user boards ' + JSON.stringify(user[0].boards))
          user[0].save((err, user) => {
            if (err) {
              alert('goodbye')
              console.error(err)
              return next(err)
            }
            console.log('server user ' + user)
            return res.json(user)
          })
        })
      })
    })
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
