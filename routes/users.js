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

module.exports = router
