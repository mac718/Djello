const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const RouteHelpers = require("./RouterHelpers");
const routeHelper = new RouteHelpers();

router.post("/createList", (req, res, next) => {
  let list = new List({ name: "", cards: [] });
  let activeBoard = req.body["activeBoard"];
  let username = req.cookies["user"];

  // Board.findById(activeBoard, (err, board) => {
  //   board.lists = [...board.lists, list];
  //   board.save((err, board) => {
  //     User.find({ username: username }, (err, user) => {
  //       let oldBoard = user[0].boards.filter((json) => {
  //         return JSON.stringify(json._id) == JSON.stringify(board._id);
  //       })[0];
  //       let oldBoardIndex = user[0].boards.indexOf(oldBoard);
  //       user[0].boards.splice(oldBoardIndex, 1, board);
  //       user[0].save((err, user) => {
  //         if (err) {
  //           console.error(err);
  //           return res.json({ err: "Error: could not add new list." });
  //         }
  //         console.log("server user " + user);
  //         console.log("board.lists " + board.lists);
  //         let userAndLists = { user: user, lists: board.lists };
  //         return res.json(userAndLists);
  //       });
  //     });
  //   });
  // });

  list.save((err, list) => {
    routeHelper.handleErr(err, next);
    Board.findById(activeBoard, (err, board) => {
      if (err) {
        console.error(err);
        return res.json({ err: "Error: could not add new list." });
      }

      board.lists = [...board.lists, list];
      board.save((err, board) => {
        if (err) {
          console.error(err);
          return res.json({ err: "Error: could not add new list." });
        }
        User.find({ username: username }, (err, user) => {
          console.log("user " + JSON.stringify(user[0].boards[0]._id));
          console.log(JSON.stringify(board._id));
          if (err) {
            console.error(err);
            return res.json({ err: "Error: could not add new list." });
          }
          let oldBoard = user[0].boards.filter((json) => {
            return JSON.stringify(json._id) == JSON.stringify(board._id);
          })[0];

          console.log("oldBOard " + JSON.stringify(oldBoard));
          let oldBoardIndex = user[0].boards.indexOf(oldBoard);

          user[0].boards.splice(oldBoardIndex, 1, board);

          console.log("user boards " + JSON.stringify(user[0].boards));
          user[0].save((err, user) => {
            if (err) {
              console.error(err);
              return res.json({ err: "Error: could not add new list." });
            }
            console.log("server user " + user);
            console.log("board.lists " + board.lists);
            let userAndLists = { user: user, lists: board.lists };
            return res.json(userAndLists);
          });
        });
      });
    });
  });
});

router.delete("/deleteList", (req, res, next) => {
  let { listId, currentUser } = req.body;

  List.findById(listId, (err, list) => {
    if (err) {
      console.error(err);
      return res.json({ err: "Error: could not delete list." });
    }
    list.delete((err, list) => {
      if (err) {
        console.error(err);
        return res.json({ err: "Error: could not delete list." });
      }
      Board.findById(currentUser.activeBoard, (err, board) => {
        if (err) {
          console.error(err);
          return res.json({ err: "Error: could not delete list." });
        }
        let deletedListIndex;
        board.lists.forEach((boardList, index) => {
          if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
            deletedListIndex = index;
          }
        });
        board.lists.splice(deletedListIndex, 1);
        board.save((err, board) => {
          if (err) {
            console.error(err);
            return res.json({ err: "Error: could not delete list." });
          }
          User.findById(currentUser._id, (err, user) => {
            let modifiedBoardIndex;
            user.boards.forEach((userBoard, index) => {
              if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
                modifiedBoardIndex = index;
              }
            });
            user.boards.splice(modifiedBoardIndex, 1, board);
            user.save((err, user) => {
              if (err) {
                console.error(err);
                return res.json({ err: "Error: could not delete list." });
              }
              let userAndLists = { user: user, lists: board.lists };
              return res.json(userAndLists);
            });
          });
        });
      });
    });
  });
});

router.put("/changeListName", (req, res) => {
  let name = req.body.componentName;
  let currentUser = req.body.currentUser;
  let activeBoardId = currentUser.activeBoard;
  let listId = req.body.listId;

  List.findById(listId, (err, list) => {
    console.log("list ID", listId);
    if (err) {
      console.error(err);
      return res.json({ err: "Error: could not save new list name" });
    }

    list.name = name;
    console.log(list.name);
    list.save((err, list) => {
      Board.findById(activeBoardId, (err, board) => {
        if (err) {
          console.error(err);
          return res.json({ err: "Error: could not save new list name" });
        }
        let modifiedListIndex;
        board.lists.forEach((boardList, index) => {
          if (JSON.stringify(boardList._id) === JSON.stringify(listId)) {
            modifiedListIndex = index;
          }
        });
        board.lists.splice(modifiedListIndex, 1, list);
        User.findById(currentUser._id, (err, user) => {
          if (err) {
            console.error(err);
            return res.json({ err: "Error: could not save new list name" });
          }
          let modifiedBoardIndex;
          user.boards.forEach((userBoard, index) => {
            if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
              modifiedBoardIndex = index;
            }
          });
          user.boards.splice(modifiedBoardIndex, 1, board);
          user.save((err, user) => {
            if (err) {
              console.error(err);
              return res.json({ err: "Error: could not save new list name" });
            }
            let userAndLists = { user: user, lists: board.lists };
            return res.json(userAndLists);
          });
        });
      });
    });
  });
});

router.put("/updateListAfterDnd", (req, res, next) => {
  let currentUser = req.body.currentUser;
  let source = req.body.source;
  let destination = req.body.destination;
  let cardId = req.body.draggableId;

  if (source.droppableId === destination.droppableId) {
    Card.findById(cardId, (err, card) => {
      if (err) {
        console.error(err);
        return res.json({ err: "Error: change to lists not saved." });
      }

      List.findById(source.droppableId, (err, list) => {
        if (err) {
          console.error(err);
          return res.json({ err: "Error: change to lists not saved." });
        }
        list.cards.splice(source.index, 1);
        list.cards.splice(destination.index, 0, card);

        list.save((err, list) => {
          if (err) {
            console.error(err);
            return res.json({ err: "Error: change to lists not saved." });
          }
          Board.findById(currentUser.activeBoard, (err, board) => {
            let modifiedLisIndex;
            board.lists.forEach((boardList, index) => {
              if (JSON.stringify(list._id) === JSON.stringify(boardList._id)) {
                modifiedLisIndex = index;
              }
            });
            board.lists.splice(modifiedLisIndex, 1, list);
            board.save((err, board) => {
              if (err) {
                console.error(err);
                return res.json({ err: "Error: change to lists not saved." });
              }
              User.findById(currentUser._id, (err, user) => {
                if (err) {
                  console.error(err);
                  return res.json({ err: "Error: change to lists not saved." });
                }
                let modifiedBoardIndex;
                user.boards.forEach((userBoard, index) => {
                  if (
                    JSON.stringify(board._id) === JSON.stringify(userBoard._id)
                  ) {
                    modifiedBoardIndex = index;
                  }
                });
                user.boards.splice(modifiedBoardIndex, 1, board);
                user.save((err, user) => {
                  if (err) {
                    console.error(err);
                    return res.json({
                      err: "Error: change to lists not saved.",
                    });
                  }
                  return res.json(user);
                });
              });
            });
          });
        });
      });
    });
  } else {
    Card.findById(cardId, (err, card) => {
      if (err) {
        console.error(err);
        return res.json({ err: "Error: change to lists not saved." });
      }
      List.findById(source.droppableId, (err, sourceList) => {
        if (err) {
          console.error(err);
          return res.json({ err: "Error: change to lists not saved." });
        }
        sourceList.cards.splice(source.index, 1);
        sourceList.save((err, sourceList) => {
          List.findById(destination.droppableId, (err, destinationList) => {
            if (err) {
              console.error(err);
              return res.json({ err: "Error: change to lists not saved." });
            }
            destinationList.cards.splice(destination.index, 0, card);
            destinationList.save((err, destinationList) => {
              Board.findById(currentUser.activeBoard, (err, board) => {
                let modifiedListIndex_1;
                board.lists.forEach((sourceBoardList, index) => {
                  if (
                    JSON.stringify(sourceBoardList._id) ===
                    JSON.stringify(sourceList._id)
                  ) {
                    modifiedListIndex_1 = index;
                  }
                });
                board.lists.splice(modifiedListIndex_1, 1, sourceList);

                let modifiedListIndex_2;
                board.lists.forEach((destinationBoardList, index) => {
                  if (
                    JSON.stringify(destinationBoardList._id) ===
                    JSON.stringify(destinationList._id)
                  ) {
                    modifiedListIndex_2 = index;
                  }
                });

                board.lists.splice(modifiedListIndex_2, 1, destinationList);

                board.save((err, board) => {
                  if (err) {
                    console.error(err);
                    return res.json({
                      err: "Error: change to lists not saved.",
                    });
                  }
                  User.findById(currentUser._id, (err, user) => {
                    if (err) {
                      console.error(err);
                      return res.json({
                        err: "Error: change to lists not saved.",
                      });
                    }
                    let modifiedBoardIndex;
                    user.boards.forEach((userBoard, index) => {
                      if (
                        JSON.stringify(userBoard._id) ===
                        JSON.stringify(board._id)
                      ) {
                        modifiedBoardIndex = index;
                      }
                    });

                    user.boards.splice(modifiedBoardIndex, 1, board);
                    user.save((err, user) => {
                      if (err) {
                        console.error(err);
                        return res.json({
                          err: "Error: change to lists not saved.",
                        });
                      }
                      return res.json(user);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
});

module.exports = router;
