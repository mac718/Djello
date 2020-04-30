const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')
const Checklist = require('../models/checklist')

router.post('/createChecklist', (req, res, next) => {
  let { currentUser, cardId, listId } = req.body
  let checklist = new Checklist({ title: 'Enter title...', items: [] })

  checklist.save((err, checklist) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    Card.findById(cardId, (err, card) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      card.checklists = [...card.checklists, checklist]
      let date = new Date()
      card.activity = [
        ...card.activity,
        `${currentUser.username} created a checklist at ${date.toString()}`,
      ]
      console.log(JSON.stringify(card.checklists))
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
            if (JSON.stringify(card._id) === JSON.stringify(listCard._id)) {
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
                if (
                  JSON.stringify(list._id) === JSON.stringify(boardList._id)
                ) {
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
                      JSON.stringify(board._id) ===
                      JSON.stringify(userBoard._id)
                    ) {
                      modifiedBoardIndex = index
                    }
                  })
                  user.boards.splice(modifiedBoardIndex, 1, board)
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

router.patch('/updateChecklistTitle', (req, res, next) => {
  let { title, currentUser, checklistId, cardId, listId } = req.body

  Checklist.findById(checklistId, (err, checklist) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    checklist.title = title
    checklist.save((err, checklist) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      Card.findById(cardId, (err, card) => {
        if (err) {
          console.error(err)
          return next(err)
        }
        let modifiedChecklistIndex
        card.checklists.forEach((cardChecklist, index) => {
          if (
            JSON.stringify(checklist._id) === JSON.stringify(cardChecklist._id)
          ) {
            modifiedChecklistIndex = index
          }
        })
        card.checklists.splice(modifiedChecklistIndex, 1, checklist)
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
              if (JSON.stringify(card._id) === JSON.stringify(listCard._id)) {
                modifiedCardIndex = index
              }
            })
            list.cards.splice(modifiedCardIndex, 1, card)
            let date = new Date()
            card.activity = [
              ...card.activity,
              `${currentUser.username} changed the title of ${
                checklist.title
              } on ${date.toString()}`,
            ]
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
                  if (
                    JSON.stringify(list._id) === JSON.stringify(boardList._id)
                  ) {
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
                        JSON.stringify(board._id) ===
                        JSON.stringify(userBoard._id)
                      ) {
                        modifiedBoardIndex = index
                      }
                    })
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
  })
})

router.delete('/deleteChecklist', (req, res, next) => {
  let { currentUser, checklistId, cardId, listId } = req.body

  Checklist.findById(checklistId, (err, checklist) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    checklist.delete((err, checklist) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      Card.findById(cardId, (err, card) => {
        if (err) {
          console.error(err)
          return next(err)
        }
        let modifiedChecklistIndex
        card.checklists.forEach((cardChecklist, index) => {
          if (
            JSON.stringify(checklist._id) === JSON.stringify(cardChecklist._id)
          ) {
            modifiedChecklistIndex = index
          }
        })
        card.checklists.splice(modifiedChecklistIndex, 1)
        let date = new Date()
        card.activity = [
          ...card.activity,
          `${currentUser.username} deleted ${
            checklist.title
          } on ${date.toString()}`,
        ]
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
              if (JSON.stringify(card._id) === JSON.stringify(listCard._id)) {
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
                  if (
                    JSON.stringify(list._id) === JSON.stringify(boardList._id)
                  ) {
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
                        JSON.stringify(board._id) ===
                        JSON.stringify(userBoard._id)
                      ) {
                        modifiedBoardIndex = index
                      }
                    })
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
  })
})

module.exports = router
