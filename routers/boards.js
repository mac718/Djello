const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Board = require("../models/board");

router.post("/createBoard", (req, res) => {
  let board = new Board({
    name: "",
    lists: [],
  });
  let currentUser = req.body.currentUser;

  function handleError(err, message) {
    if (err) {
      console.error(err);
      return res.json({
        err: message,
      });
    }
  }

  function returnUserAndLists(err, user) {
    handleError(err, "Error: could not add board to current user.");
    let userAndLists = { user: user, lists: board.lists };
    return res.json(userAndLists);
  }

  board.save((err, board) => {
    handleError(err, "Error: could not create board.");
    User.findById(currentUser._id, (err, user) => {
      handleError(err, "Error: could not add board to current user.");
      user.boards.push(board);
      user.activeBoard = board._id;
      user.save(returnUserAndLists(err, user));
    });
  });
});

router.delete("/deleteBoard", (req, res, next) => {
  let boardId = req.body.board;
  let currentUser = req.body.currentUser;

  Board.findById(boardId, (err, board) => {
    if (err) {
      console.error(err);
      return res.json({
        err: "Error: could not delete board.",
      });
    }
    board.delete((err, board) => {
      if (err) {
        console.error(err);
        return res.json({
          err: "Error: could not delete board.",
        });
      }
      board.members.forEach((member) => {
        User.find({ username: member }, (err, user) => {
          let deletedBoardIndex;
          user[0].boards.forEach((userBoard, index) => {
            if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
              deletedBoardIndex = index;
            }
          });
          user[0].boards.splice(deletedBoardIndex, 1);
          user[0].save((err) => {
            if (err) {
              console.error(err);
              return res.json({
                err: `Error: could not delete board from member ${user[0].username}.`,
              });
            }
          });
        });
      });
      User.findById(currentUser._id, (err, user) => {
        if (err) {
          console.error(err);
          return res.json({
            err: "Error: could not update current user.",
          });
        }
        if (board.members.includes(user.username)) {
          let deletedBoardIndex;
          user.boards.forEach((userBoard, index) => {
            if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
              deletedBoardIndex = index;
            }
          });
          user.boards.splice(deletedBoardIndex, 1);
        }
        user.save((err, user) => {
          if (err) {
            console.error(err);
            return res.json({
              err: "Error: could not update current user.",
            });
          }
          let userAndLists = { user: user, lists: board.lists };
          return res.json(userAndLists);
        });
      });
    });
  });
});

router.put("/changeBoardName", (req, res, next) => {
  let name = req.body.componentName;
  let currentUser = req.body.currentUser;
  let activeBoardId = currentUser.activeBoard;

  Board.findById(activeBoardId, (err, board) => {
    if (err) {
      console.error(err);
      return res.json({
        err: "Error: could not change board name.",
      });
    }
    board.name = name;
    board.save((err, board) => {
      if (err) {
        console.error(err);
        return res.json({
          err: "Error: could not change board name.",
        });
      }

      User.findById(currentUser._id, (err, user) => {
        if (err) {
          console.error(err);
          return res.json({
            err: "Error: could not update current user.",
          });
        }
        let modifiedBoardIndex;
        user.boards.forEach((userBoard, index) => {
          if (JSON.stringify(userBoard._id) === JSON.stringify(activeBoardId)) {
            modifiedBoardIndex = index;
          }
        });
        console.log("modifiedBoardIndex " + modifiedBoardIndex);
        user.boards.splice(modifiedBoardIndex, 1, board);
        user.save((err, user) => {
          if (err) {
            console.error(err);
            return res.json({
              err: "Error: could not update current user.",
            });
          }
          let userAndLists = { user: user, lists: board.lists };
          return res.json(userAndLists);
        });
      });
    });
  });
});

router.patch("/switchActiveBoard", (req, res, next) => {
  let boardId = req.body.boardId;
  let currentUser = req.body.currentUser;

  User.findById(currentUser._id, (err, user) => {
    if (err) {
      console.error(err);
      return res.json({
        err: "Error: could not update current user's active board.",
      });
    }
    user.activeBoard = boardId;
    Board.findById(boardId, (err, board) => {
      if (err) {
        console.error(err);
        return res.json({
          err: "Error: could not update current user's active board.",
        });
      }
      user.save((err, user) => {
        if (err) {
          console.error(err);
          return res.json({
            err: "Error: could not update current user's active board.",
          });
        }
        let userAndLists = { user: user, lists: board.lists };
        return res.json(userAndLists);
      });
    });
  });
});

module.exports = router;
