const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')
const Checklist = require('../models/checklist')
const ChecklistItem = require('../models/checklistItem')

router.post('/addChecklistItem', (req, res, next) => {
  let {
    checklistId,
    cardId,
    listId,
    currentUser,
    checklistItemContent,
  } = req.body

  let checklistItem = new ChecklistItem({
    content: checklistItemContent,
    checked: false,
  })

  console.log('checklistId ' + checklistId)
  console.log('cardId ' + cardId)
  console.log('listId ' + listId)

  checklistItem.save((err, checklistItem) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    Checklist.findById(checklistId, (err, checklist) => {
      if (err) {
        console.log(err)
        return res.send({ error: err })
      } else {
        checklist.items = [...checklist.items, checklistItem]
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
                JSON.stringify(checklist._id) ===
                JSON.stringify(cardChecklist._id)
              ) {
                modifiedChecklistIndex = index
              }
            })
            card.checklists.splice(modifiedChecklistIndex, 1, checklist)
            let date = new Date()
            card.activity = [
              ...card.activity,
              `${currentUser.username} added a new item to ${
                checklist.title
              } at ${date.toString()}`,
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
                  if (
                    JSON.stringify(card._id) === JSON.stringify(listCard._id)
                  ) {
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
                        JSON.stringify(list._id) ===
                        JSON.stringify(boardList._id)
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
      }
    })
  })
})

router.patch('/checkChecklistItem', (req, res, next) => {
  let {
    currentUser,
    checklistItemId,
    checklistId,
    cardId,
    listId,
    attributeType,
    cardAttributeContent,
  } = req.body

  ChecklistItem.findById(checklistItemId, (err, checklistItem) => {
    if (err) {
      console.error(err)
      return next(err)
    }

    checklistItem.checked
      ? (checklistItem.checked = false)
      : (checklistItem.checked = true)

    console.log(JSON.stringify(attributeType))

    checklistItem.save((err, checklistItem) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      Checklist.findById(checklistId, (err, checklist) => {
        if (err) {
          console.error(err)
          return next(err)
        }
        let modifiedChecklistIndex
        checklist.items.forEach((item, index) => {
          if (JSON.stringify(checklistItem._id) === JSON.stringify(item._id)) {
            modifiedChecklistIndex = index
          }
        })
        checklist.items.splice(modifiedChecklistIndex, 1, checklistItem)
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
                JSON.stringify(checklist._id) ===
                JSON.stringify(cardChecklist._id)
              ) {
                modifiedChecklistIndex = index
              }
            })
            card.checklists.splice(modifiedChecklistIndex, 1, checklist)
            let date = new Date()
            card.activity = [
              ...card.activity,
              `${currentUser.username} checked an item in ${
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
                  if (
                    JSON.stringify(card._id) === JSON.stringify(listCard._id)
                  ) {
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
                        JSON.stringify(list._id) ===
                        JSON.stringify(boardList._id)
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
  })
})

module.exports = router
