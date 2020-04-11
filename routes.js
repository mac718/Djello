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
    let activeBoard = req.user.boards.filter(board => {
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

router.post('/createBoard', (req, res, next) => {
  let board = new Board({
    name: '',
    lists: [],
  })
  console.log('new board ' + board)
  let currentUser = req.body.currentUser

  board.save((err, board) => {
    if (err) {
      console.error(err)
      res.status(401).json({ error: err })
    }
    User.findById(currentUser._id, (err, user) => {
      if (err) {
        console.log(err)
        res.json({ error: 'Error saving board' })
      }
      user.boards.push(board)
      user.activeBoard = board._id
      user.save((err, user) => {
        if (err) {
          console.log(err)
          res.json({ error: 'Error saving board' })
        }
        console.log('user[0] ' + user)
        let userAndLists = { user: user, lists: board.lists }
        return res.json(userAndLists)
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
      //board.lists.push(list)
      board.lists = [...board.lists, list]
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
            console.log('board.lists ' + board.lists)
            let userAndLists = { user: user, lists: board.lists }
            return res.json(userAndLists)
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
            let userAndLists = { user: user, lists: board.lists }
            return res.json(userAndLists)
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
        user.boards.forEach((userBoard, index) => {
          if (JSON.stringify(userBoard._id) === JSON.stringify(activeBoardId)) {
            modifiedBoardIndex = index
          }
        })
        console.log('modifiedBoardIndex ' + modifiedBoardIndex)
        user.boards.splice(modifiedBoardIndex, 1, board)
        user.save((err, user) => {
          if (err) {
            console.log(err)
            next(err)
          }
          let userAndLists = { user: user, lists: board.lists }
          return res.json(userAndLists)
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
        board.lists.forEach((boardList, index) => {
          if (JSON.stringify(boardList._id) === JSON.stringify(listId)) {
            modifiedListIndex = index
          }
        })
        board.lists.splice(modifiedListIndex, 1, list)
        User.findById(currentUser._id, (err, user) => {
          if (err) {
            console.log(err)
            next(err)
          }
          let modifiedBoardIndex
          user.boards.forEach((userBoard, index) => {
            if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
              modifiedBoardIndex = index
            }
          })
          user.boards.splice(modifiedBoardIndex, 1, board)
          user.save((err, user) => {
            if (err) {
              console.log(err)
              next(err)
            }
            let userAndLists = { user: user, lists: board.lists }
            return res.json(userAndLists)
          })
        })
      })
    })
  })
})

router.post('/createCard', (req, res, next) => {
  let listId = req.body.listId
  let title = req.body.title
  let currentUser = req.body.currentUser
  let date = new Date()
  let activity = [`${currentUser.username} creaated card at ${date.toString()}`]
  let card = new Card({ title, activity })

  card.save((err, card) => {
    if (err) {
      console.error(err)
      next(err)
    }
    List.findById(listId, (err, list) => {
      console.log('list id ' + listId)
      if (err) {
        console.error(err)
        next(err)
      }
      console.log('cards ' + list)
      list.cards = [...list.cards, card]
      list.save((err, list) => {
        if (err) {
          console.error(err)
          next(err)
        }
        Board.findById(currentUser.activeBoard, (err, board) => {
          if (err) {
            console.error(err)
            next(err)
          }
          let modifiedListIndex
          board.lists.forEach((boardList, index) => {
            if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
              modifiedListIndex = index
            }
          })
          console.log('modifiedLisIndex ' + modifiedListIndex)

          board.lists.splice(modifiedListIndex, 1, list)

          board.save((err, board) => {
            if (err) {
              console.error(err)
              next(err)
            }
            User.findById(currentUser._id, (err, user) => {
              if (err) {
                console.error(err)
                next(err)
              }
              let modifiedBoardIndex
              user.boards.forEach((userBoard, index) => {
                if (
                  JSON.stringify(userBoard._id) === JSON.stringify(board._id)
                ) {
                  modifiedBoardIndex = index
                }
              })
              user.boards.splice(modifiedBoardIndex, 1, board)
              user.save((err, user) => {
                if (err) {
                  console.error(err)
                  next(err)
                }
                console.log('butts ' + JSON.stringify(user.boards))
                let userAndLists = { user: user, lists: board.lists }
                return res.json(userAndLists)
              })
            })
          })
        })
      })
    })
  })
})

router.delete('/deleteCard', (req, res, next) => {
  let cardId = req.body.cardId
  let listId = req.body.listId
  let currentUser = req.body.currentUser
  let boardId = console.log('cardId ' + cardId)
  console.log('listId ' + listId)
  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      next(err)
    }
    card.delete(err => {
      if (err) {
        console.error(err)
        next(err)
      }
      List.findById(listId, (err, list) => {
        if (err) {
          console.error(err)
          next(err)
        }
        console.log('cards' + list.cards)
        let deletedCardIndex
        list.cards.forEach((listCard, index) => {
          if (JSON.stringify(listCard._id) === JSON.stringify(card._id)) {
            deletedCardIndex = index
          }
        })
        console.log('deleted card ' + deletedCardIndex)
        list.cards.splice(deletedCardIndex, 1)
        list.save((err, list) => {
          if (err) {
            console.error(err)
            next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              next(err)
            }

            let modifiedListIndex
            board.lists.forEach((boardList, index) => {
              if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
                modifiedListIndex = index
              }
            })
            board.lists.splice(modifiedListIndex, 1, list)
            board.save((err, board) => {
              if (err) {
                console.error(err)
                next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  next(err)
                }
                let modifiedBoardIndex
                user.boards.forEach((userBoard, index) => {
                  if (
                    JSON.stringify(userBoard._id) === JSON.stringify(board._id)
                  ) {
                    modifiedBoardIndex = index
                  }
                })
                console.log(modifiedBoardIndex)
                user.boards.splice(modifiedBoardIndex, 1, board)
                user.save((err, user) => {
                  if (err) {
                    console.error(err)
                    next(err)
                  }
                  let userAndLists = { user: user, lists: board.lists }
                  return res.json(userAndLists)
                })
              })
            })
          })
        })
      })
    })
  })
})

router.patch('/switchActiveBoard', (req, res, next) => {
  let boardId = req.body.boardId
  let currentUser = req.body.currentUser

  User.findById(currentUser._id, (err, user) => {
    if (err) {
      console.error(err)
      next(err)
    }
    user.activeBoard = boardId
    Board.findById(boardId, (err, board) => {
      if (err) {
        console.error(err)
        next(err)
      }
      user.save((err, user) => {
        if (err) {
          console.error(err)
          next(err)
        }
        let userAndLists = { user: user, lists: board.lists }
        return res.json(userAndLists)
      })
    })
  })
})

//handles updates card title, card description, and card members list
router.post('/updateCardAttribute', (req, res, next) => {
  let listId = req.body.listId
  let cardId = req.body.cardId
  let attributeType = req.body.attributeType
  let attributeContent = req.body.attributeContent
  let currentUser = req.body.currentUser

  console.log('list id ' + listId)
  console.log('card id ' + cardId)
  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      next(err)
    }
    if (attributeType === 'title') {
      card.title = attributeContent
      let date = new Date()
      card.activity = [
        ...card.activity,
        `${currentUser.username} edited the title at ${date.toString()}`,
      ]
    } else if (attributeType === 'description') {
      card.description = attributeContent
      let date = new Date()
      card.activity = [
        ...card.activity,
        `${currentUser.username} edited the description at ${date.toString()}`,
      ]
    } else if (attributeType === 'member') {
      if (!card.members.includes(attributeContent)) {
        console.log('yayayya!!!!')
        card.members = [...card.members, attributeContent]
        let date = new Date()
        card.activity = [
          ...card.activity,
          `${
            currentUser.username
          } added ${attributeContent} to the card at ${date.toString()}`,
        ]
      } else {
        console.log('nonnnoono!!!!')
        return res.status(500).send()
      }
    }
    card.save((err, card) => {
      if (err) {
        console.error(err)
        next(err)
      }
      List.findById(listId, (err, list) => {
        console.log('list id ' + listId)
        if (err) {
          console.error(err)
          next(err)
        }
        let modifiedCardIndex
        list.cards.forEach((listCard, index) => {
          if (JSON.stringify(listCard._id) === JSON.stringify(card._id)) {
            modifiedCardIndex = index
          }
        })
        console.log('modifiedCardIndex ' + modifiedCardIndex)
        list.cards.splice(modifiedCardIndex, 1, card)
        list.save((err, list) => {
          if (err) {
            console.error(err)
            next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              next(err)
            }
            let modifiedListIndex
            board.lists.forEach((boardList, index) => {
              if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
                modifiedListIndex = index
              }
            })
            console.log('modifiedLisIndex ' + modifiedListIndex)

            board.lists.splice(modifiedListIndex, 1, list)

            board.save((err, board) => {
              if (err) {
                console.error(err)
                next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  next(err)
                }
                let modifiedBoardIndex
                user.boards.forEach((userBoard, index) => {
                  if (
                    JSON.stringify(userBoard._id) === JSON.stringify(board._id)
                  ) {
                    modifiedBoardIndex = index
                  }
                })
                user.boards.splice(modifiedBoardIndex, 1, board)
                user.save((err, user) => {
                  if (err) {
                    console.error(err)
                    next(err)
                  }
                  console.log('butts ' + JSON.stringify(user.boards))

                  let userAndLists = { user: user, lists: board.lists }
                  return res.json(userAndLists)
                })
              })
            })
          })
        })
      })
    })
  })
})

router.get('/getAllUsers', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      console.error(err)
      next(err)
    }
    return res.json(users)
  })
})

router.post('/addBoardToMember', (req, res, next) => {
  let username = req.body.username
  let boardId = req.body.boardId

  console.log('username ' + username)

  User.find({ username }, (err, user) => {
    if (err) {
      console.error(err)
      next(err)
    }
    Board.findById(boardId, (err, board) => {
      if (err) {
        console.error(err)
        next(err)
      }
      let repeat = false
      console.log(user)
      user[0].boards.forEach(userBoard => {
        if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
          repeat = true
        }
      })
      if (!repeat) {
        user[0].boards = [...user[0].boards, board]
      }

      user[0].save(err => {
        if (err) {
          console.error(err)
          next(err)
        }
        res.status(200).send()
      })
    })
  })
})

router.delete('/deleteMemberFromCard', (req, res, next) => {
  let listId = req.body.listId
  let cardId = req.body.cardId
  let username = req.body.username
  let currentUser = req.body.currentUser

  console.log('list id ' + listId)
  console.log('card id ' + cardId)
  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      next(err)
    }
    console.log('yayayya!!!!')
    let deletedMemberIndex
    card.members.forEach((member, index) => {
      if (JSON.stringify(member) === username) {
        deletedMemberIndex = index
      }
    })
    card.members.splice(deletedMemberIndex, 1)
    let date = new Date()
    card.activity = [
      ...card.activity,
      `${
        currentUser.username
      } removed ${username} from the card at ${date.toString()}`,
    ]
    card.save((err, card) => {
      if (err) {
        console.error(err)
        next(err)
      }
      List.findById(listId, (err, list) => {
        console.log('list id ' + listId)
        if (err) {
          console.error(err)
          next(err)
        }
        let modifiedCardIndex
        list.cards.forEach((listCard, index) => {
          if (JSON.stringify(listCard._id) === JSON.stringify(card._id)) {
            modifiedCardIndex = index
          }
        })
        console.log('modifiedCardIndex ' + modifiedCardIndex)
        list.cards.splice(modifiedCardIndex, 1, card)
        list.save((err, list) => {
          if (err) {
            console.error(err)
            next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              next(err)
            }

            let modifiedListIndex
            board.lists.forEach((boardList, index) => {
              if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
                modifiedListIndex = index
              }
            })
            console.log('modifiedLisIndex ' + modifiedListIndex)

            board.lists.splice(modifiedListIndex, 1, list)

            board.save((err, board) => {
              if (err) {
                console.error(err)
                next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  next(err)
                }
                let modifiedBoardIndex
                user.boards.forEach((userBoard, index) => {
                  if (
                    JSON.stringify(userBoard._id) === JSON.stringify(board._id)
                  ) {
                    modifiedBoardIndex = index
                  }
                })
                user.boards.splice(modifiedBoardIndex, 1, board)
                user.save((err, user) => {
                  if (err) {
                    console.error(err)
                    next(err)
                  }
                  console.log('butts ' + JSON.stringify(user.boards))
                  let userAndLists = { user: user, lists: board.lists }
                  return res.json(userAndLists)
                })
              })
            })
          })
        })
      })
    })
  })
})

router.post('/updateListAfterDnd', (req, res, next) => {
  let currentUser = req.body.currentUser
  let source = req.body.source
  let destination = req.body.destination
  let cardId = req.body.draggableId

  if (source.droppableId === destination.droppableId) {
    Card.findById(cardId, (err, card) => {
      if (err) {
        console.error(err)
        next(err)
      }
      List.findById(source.droppableId, (err, list) => {
        if (err) {
          console.error(err)
          next(err)
        }
        list.cards.splice(source.index, 1)
        list.cards.splice(destination.index, 0, card)

        list.save((err, list) => {
          if (err) {
            console.error(err)
            next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            let modifiedLisIndex
            board.lists.forEach((boardList, index) => {
              if (JSON.stringify(list._id) === JSON.stringify(boardList._id)) {
                modifiedLisIndex = index
              }
            })
            board.lists.splice(modifiedLisIndex, 1, list)
            board.save((err, board) => {
              if (err) {
                console.error(err)
                next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  next(err)
                }
                let modifiedBoardIndex
                user.boards.forEach((userBoard, index) => {
                  if (
                    JSON.stringify(board._id) === JSON.stringify(userBoard._id)
                  ) {
                    modifiedBoardIndex = index
                  }
                })
                user.boards.splice(modifiedBoardIndex, 1, board)
                user.save((err, user) => {
                  if (err) {
                    console.error(err)
                    next(err)
                  }
                  return res.json(user)
                })
              })
            })
          })
        })
      })
    })
  } else {
    Card.findById(cardId, (err, card) => {
      if (err) {
        console.error(err)
        next(err)
      }
      List.findById(source.droppableId, (err, sourceList) => {
        if (err) {
          console.error(err)
          next(err)
        }
        sourceList.cards.splice(source.index, 1)
        sourceList.save((err, sourceList) => {
          List.findById(destination.droppableId, (err, destinationList) => {
            if (err) {
              console.error(err)
              next(err)
            }
            destinationList.cards.splice(destination.index, 0, card)
            destinationList.save((err, destinationList) => {
              Board.findById(currentUser.activeBoard, (err, board) => {
                let modifiedListIndex_1
                board.lists.forEach((sourceBoardList, index) => {
                  if (
                    JSON.stringify(sourceBoardList._id) ===
                    JSON.stringify(sourceList._id)
                  ) {
                    modifiedListIndex_1 = index
                  }
                })
                board.lists.splice(modifiedListIndex_1, 1, sourceList)

                let modifiedListIndex_2
                board.lists.forEach((destinationBoardList, index) => {
                  if (
                    JSON.stringify(destinationBoardList._id) ===
                    JSON.stringify(destinationList._id)
                  ) {
                    modifiedListIndex_2 = index
                  }
                })

                board.lists.splice(modifiedListIndex_2, 1, destinationList)

                board.save((err, board) => {
                  if (err) {
                    console.error(err)
                    next(err)
                  }
                  User.findById(currentUser._id, (err, user) => {
                    if (err) {
                      console.error(err)
                      next(err)
                    }
                    let modifiedBoardIndex
                    user.boards.forEach((userBoard, index) => {
                      if (
                        JSON.stringify(userBoard._id) ===
                        JSON.stringify(board._id)
                      ) {
                        modifiedBoardIndex = index
                      }
                    })

                    user.boards.splice(modifiedBoardIndex, 1, board)
                    user.save((err, user) => {
                      if (err) {
                        console.error(err)
                        next(err)
                      }
                      return res.json(user)
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }
})

module.exports = router
