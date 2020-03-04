const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('./models/user')
const withAuth = require('./middleware')
const Board = require('./models/board')
const List = require('./models/list')
const Card = require('./models/card')

router.get('/checkForCurrentUser', withAuth, (req, res) => {
  res.status(200).send()
})

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

router.post('/register', (req, res, next) => {
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

router.post('/logout', (req, res) => {
  req.logOut()
  res.clearCookie('user')
  res.clearCookie('connect.sid')
  res.json({ loggedOut: true })
})

router.post('/createBoard', (req, res, next) => {
  let board = new Board({ name: 'New Board', lists: [] })

  board.save((err, board) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    let username = req.cookies.user
    let user = User.find({ username }, (err, user) => {
      if (err) {
        console.log(err)
        res.json({ error: 'Error saving board' })
      }
      user[0].boards.push(board)
      user[0].activeBoard = board._id
      user[0].save((err, user) => {
        if (err) {
          console.log(err)
          res.json({ error: 'Error saving board' })
        }
        console.log('user[0] ' + user)
        return res.json(user)
      })
    })
    console.log('board ' + board)
  })
})

router.delete('/deleteBoard', (req, res, next) => {
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
      user[0].activeBoard = null
      console.log(user[0])
      user[0].save(err => {
        if (err) {
          console.log(err)
          res.status(401).json({ error: err })
        }
        Board.findByIdAndDelete(board, err => {
          if (err) console.log(err)
          console.log('hoooray ' + board)
          res.json(user[0])
        })
      })
    })
  })
})

router.post('/createList', (req, res, next) => {
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

router.delete('/deleteList', (req, res, next) => {
  let listId = req.body.listId
  List.deleteOne({ id: listId }, err => {
    if (err) {
      console.log(err)
      next(err)
    }
    User.find({ username: req.cookies.user }, (err, user) => {
      if (err) {
        console.log(err)
        next(err)
      }
      Board.find({ _id: user[0].activeBoard }, (err, board) => {
        console.log('modify ' + JSON.stringify(board))
        if (err) {
          console.log(err)
          next(err)
        }
        let deletedList = board[0].lists.filter(list => {
          return list._id === listId
        })
        let deletedListIndex = board[0].lists.indexOf(deletedList)
        board[0].lists.splice(deletedListIndex, 1)
        board[0].save((err, board) => {
          if (err) {
            console.log(err)
            next(err)
          }
          let modifiedBoard = user[0].boards.filter(board => {
            return (
              JSON.stringify(board._id) === JSON.stringify(user[0].activeBoard)
            )
          })
          let modifiedBoardIndex = user[0].boards.indexOf(modifiedBoard)
          user[0].boards.splice(modifiedBoardIndex, 1, board)
          user[0].save((err, user) => {
            if (err) {
              console.log(err)
              next(err)
            }
            console.log('user[0] ' + user)
            return res.json(user)
          })
        })
      })
    })
  })
})

router.post('/changeBoardName', (req, res, next) => {
  let name = req.body.componentName
  let currentUser = req.body.currentUser
  let activeBoardId = currentUser.activeBoard

  Board.findById(activeBoardId, (err, board) => {
    if (err) {
      console.log(err)
      next(err)
    }
    board.name = name
    board.save((err, board) => {
      if (err) {
        console.log(err)
        next(err)
      }

      User.findById(currentUser._id, (err, user) => {
        if (err) {
          console.log(err)
          next(err)
        }
        let modifiedBoardIndex
        let modifiedBoard = user.boards.filter((board, index) => {
          modifiedBoardIndex = index
          return board._id === activeBoardId
        })
        user.boards.splice(modifiedBoardIndex, 1, board)
        user.save((err, user) => {
          if (err) {
            console.log(err)
            next(err)
          }
          return res.json(user)
        })
      })
    })
  })
})

router.post('/changeListName', (req, res, next) => {
  let name = req.body.componentName
  let currentUser = req.body.currentUser
  let activeBoardId = currentUser.activeBoard
  let listId = req.body.listId

  List.findById(listId, (err, list) => {
    if (err) {
      console.log(err)
      next(err)
    }

    list.name = name
    console.log(list.name)
    list.save((err, list) => {
      Board.findById(activeBoardId, (err, board) => {
        if (err) {
          console.log(err)
          next(err)
        }
        let modifiedListIndex
        let modifiedList = board.lists.filter((list, index) => {
          modifiedBoardIndex = index
          return listId === list._id
        })
        board.lists.splice(modifiedListIndex, 1, list)
        User.findById(currentUser._id, (err, user) => {
          if (err) {
            console.log(err)
            next(err)
          }
          let modifiedBoardIndex
          let modifiedBoard = user.boards.filter((userBoard, index) => {
            modifiedBoardIndex = index
            return userBoard._id === board._id
          })
          user.boards.splice(modifiedBoardIndex, 1, board)
          user.save((err, user) => {
            if (err) {
              console.log(err)
              next(err)
            }
            res.json(user)
          })
        })
      })
    })
  })
})

module.exports = router
