const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')
const FileUpload = require('../services/file_upload')

router.post('/createCard', (req, res, next) => {
  let listId = req.body.listId
  let title = req.body.title
  let currentUser = req.body.currentUser
  let date = new Date()
  let activity = [`${currentUser.username} created card at ${date.toString()}`]
  let card = new Card({ title, activity })

  card.save((err, card) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    List.findById(listId, (err, list) => {
      console.log('list id ' + listId)
      if (err) {
        console.error(err)
        return next(err)
      }
      console.log('cards ' + list)
      list.cards = [...list.cards, card]
      list.save((err, list) => {
        if (err) {
          console.error(err)
          return next(err)
        }
        Board.findById(currentUser.activeBoard, (err, board) => {
          if (err) {
            console.error(err)
            return next(err)
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
              return next(err)
            }
            User.findById(currentUser._id, (err, user) => {
              if (err) {
                console.error(err)
                return next(err)
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
                  return next(err)
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

  console.log('listId ' + listId)
  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    card.delete((err) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      List.findById(listId, (err, list) => {
        if (err) {
          console.error(err)
          return next(err)
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
            return next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              return next(err)
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
                return next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  return next(err)
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
                    return next(err)
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

router.put('/updateCardTitle', (req, res, next) => {
  let { listId, cardId, cardTitle, currentUser } = req.body

  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      return next(err)
    }

    if (cardTitle === '') {
      card.title = 'Title...'
    } else {
      card.title = cardTitle
    }

    let date = new Date()
    card.activity = [
      ...card.activity,
      `${currentUser.username} edited the title at ${date.toString()}`,
    ]
    card.save((err, card) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      console.log(JSON.stringify(card))
      List.findById(listId, (err, list) => {
        console.log('list id ' + listId)
        if (err) {
          console.error(err)
          return next(err)
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
            return next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              return next(err)
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
                return next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  return next(err)
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
                    return next(err)
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

router.put('/updateCardDescription', (req, res, next) => {
  let { listId, cardId, cardDescription, currentUser } = req.body
  console.log('cardDescription ' + cardDescription)

  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      return next(err)
    }

    card.description = cardDescription
    let date = new Date()
    card.activity = [
      ...card.activity,
      `${currentUser.username} edited the description at ${date.toString()}`,
    ]

    card.save((err, card) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      List.findById(listId, (err, list) => {
        console.log('list id ' + listId)
        if (err) {
          console.error(err)
          return next(err)
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
            return next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              return next(err)
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
                return next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  return next(err)
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
                    return next(err)
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

router.put('/addMemberToCard', (req, res, next) => {
  let { listId, cardId, memberUsername, currentUser } = req.body

  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      return next(err)
    }

    if (!card.members.includes(memberUsername)) {
      console.log('yayayya!!!!')
      card.members = [...card.members, memberUsername]
      let date = new Date()
      card.activity = [
        ...card.activity,
        `${
          currentUser.username
        } added ${memberUsername} to the card at ${date.toString()}`,
      ]
    } else {
      console.log('nonnnoono!!!!')
      return res.status(500).send()
    }

    card.save((err, card) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      List.findById(listId, (err, list) => {
        console.log('list id ' + listId)
        if (err) {
          console.error(err)
          return next(err)
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
            return next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              return next(err)
            }
            board.members = [...board.members, memberUsername]
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
                return next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  return next(err)
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
                    return next(err)
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

router.post('/addBoardToMember', (req, res, next) => {
  let username = req.body.username
  let boardId = req.body.boardId

  console.log('username ' + username)

  User.find({ username }, (err, user) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    Board.findById(boardId, (err, board) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      let repeat = false
      console.log(user)
      user[0].boards.forEach((userBoard) => {
        if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
          repeat = true
        }
      })
      if (!repeat) {
        user[0].boards = [...user[0].boards, board]
      }

      user[0].save((err) => {
        if (err) {
          console.error(err)
          return next(err)
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
      return next(err)
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
        return next(err)
      }
      List.findById(listId, (err, list) => {
        console.log('list id ' + listId)
        if (err) {
          console.error(err)
          return next(err)
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
            return next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              return next(err)
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
                return next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  return next(err)
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
                    return next(err)
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

router.post('/addAttachmentUrlToCard', (req, res, next) => {
  let { cardId, listId, url, currentUser } = req.body

  console.log('myeeerrrp')

  Card.findById(cardId, (err, card) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    card.attachments = [...card.attachments, url]
    card.save((err, card) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      List.findById(listId, (err, list) => {
        if (err) {
          console.error(err)
          return next(err)
        }
        let modifiedCardIndex
        list.cards.forEach((listCard, index) => {
          if (JSON.stringify(listCard._id) === JSON.stringify(card._id)) {
            modifiedCardIndex = index
          }
        })
        list.cards.splice(modifiedCardIndex, 1, card)
        list.save((err, list) => {
          if (err) {
            console.error(err)
            return next(err)
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            if (err) {
              console.error(err)
              return next(err)
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
                return next(err)
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err)
                  return next(err)
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
                    return next(err)
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

const mw = FileUpload.single('photo')
router.post('/uploadPhoto', mw, (req, res, next) => {
  console.log(req.body)

  FileUpload.upload({
    data: req.file.buffer,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
  })
    .then((data) => {
      console.log(JSON.stringify(data))
      return res.json(data)
    })
    .catch(next)
})

module.exports = router
