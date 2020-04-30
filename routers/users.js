const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const Board = require('../models/board')
const withAuth = require('./middleware')
const path = require('path')

router.get('/checkForCurrentUser', withAuth, (req, res) => {
  res.status(200).send()
})

router.post(
  '/login',
  function (req, res, next) {
    console.log(req.body)
    console.log('================')
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.user)
    res.cookie('user', req.user.username)
    let activeBoard = req.user.boards.filter((board) => {
      return JSON.stringify(board._id) === JSON.stringify(req.user.activeBoard)
    })[0]
    var info = {
      user: req.user,
      redirect: `/${req.user.username}`,
      boards: req.user.boards,
      lists: activeBoard.lists,
    }
    res.json(info)
  },
)

router.post('/register', (req, res, next) => {
  let { username, password } = req.body
  let activeBoard = new Board({
    name: '',
    lists: [],
  })
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
    req.login(user, function (err) {
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
        lists: user.boards.lists,
      }
      res.json(info)
    })
  })
})

router.post('/logout', (req, res) => {
  req.logOut()
  res.clearCookie('user')
  res.clearCookie('connect.sid')
  res.json({ loggedOut: true })
})

router.get('/getAllUsers', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    console.log(JSON.stringify('snyarff ' + users))
    return res.json(users)
  })
})

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'), function (
    err,
  ) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = router
