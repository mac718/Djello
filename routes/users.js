const express = require('express')
const router = express.Router()

router.post(
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

module.exports = router
