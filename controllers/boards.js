const NotFoundError = require("../errors/NotFoundError");
const asyncWrapper = require("../middleware/async");
const { Board } = require("../models");
const { User } = require("../models");

const createBoard = asyncWrapper(async (req, res) => {
  let board = new Board({
    name: "",
    lists: [],
  });
  let currentUser = req.body.currentUser;

  board = await board.save();

  if (!board) {
    throw new NotFoundError("Error: could not add board to current user.");
  }

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError("Error: could not add board to current user.");
  }

  user.boards.push(board);
  user.activeBoard = board._id;

  user = await user.save();

  if (!user) {
    throw new NotFoundError("Error: could not add board to current user.");
  }

  const userAndLists = { user: user, lists: board.lists };
  res.status(200).json(userAndLists);
});

const deleteBoard = asyncWrapper(async (req, res, next) => {
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

module.exports = { createBoard, deleteBoard };
