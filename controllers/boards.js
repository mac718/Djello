const CustomAPIError = require("../errors/customAPIError");
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

  let board = await Board.findById(boardId);

  if (!board) {
    throw new NotFoundError("Error: could not delete board.");
  }

  board = await board.delete();

  if (!board) {
    throw new NotFoundError("Error: could not delete board.");
  }

  await _deleteBoardFromMemberUsers(board);

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError(
      `Error: could not remove board from ${member}'s account`
    );
  }

  user = await _deleteBoardFromCurrentUser(user, boardId);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);
});

const changeBoardName = asyncWrapper(async (req, res) => {
  let name = req.body.componentName;
  let currentUser = req.body.currentUser;
  let activeBoardId = currentUser.activeBoard;

  let board = await Board.findById(activeBoardId);

  if (!board) {
    throw new NotFoundError("Error: could not change board name.");
  }

  board.name = name;

  board = await board.save();

  let user = await User.findById(currentUser._id);

  if (!board) {
    throw new NotFoundError("Error: could not update user's boards.");
  }

  _updateUsersBoardName(user, activeBoardId, board);

  user = await user.save();

  if (!board) {
    throw new CustomAPIError("Error: could not update user's boards.", 500);
  }

  let userAndLists = { user: user, lists: board.lists };
  return res.json(userAndLists);

  // Board.findById(activeBoardId, (err, board) => {
  //   if (err) {
  //     console.error(err);
  //     return res.json({
  //       err: "Error: could not change board name.",
  //     });
  //   }
  //   board.name = name;
  //   board.save((err, board) => {
  //     if (err) {
  //       console.error(err);
  //       return res.json({
  //         err: "Error: could not change board name.",
  //       });
  //     }

  //     User.findById(currentUser._id, (err, user) => {
  //       if (err) {
  //         console.error(err);
  //         return res.json({
  //           err: "Error: could not update current user.",
  //         });
  //       }
  //       let modifiedBoardIndex;
  //       user.boards.forEach((userBoard, index) => {
  //         if (JSON.stringify(userBoard._id) === JSON.stringify(activeBoardId)) {
  //           modifiedBoardIndex = index;
  //         }
  //       });
  //       console.log("modifiedBoardIndex " + modifiedBoardIndex);
  //       user.boards.splice(modifiedBoardIndex, 1, board);
  //       user.save((err, user) => {
  //         if (err) {
  //           console.error(err);
  //           return res.json({
  //             err: "Error: could not update current user.",
  //           });
  //         }
  //         let userAndLists = { user: user, lists: board.lists };
  //         return res.json(userAndLists);
  //       });
  //     });
  //   });
  // });
});

//private

async function _deleteBoardFromMemberUsers(board) {
  board.members.forEach(async (member) => {
    let user = await User.find({ username: member })[0];
    if (!user) {
      throw new NotFoundError(
        `Error: could not remove board from ${member}'s account`
      );
    }

    let deletedBoardIndex;
    user.boards.forEach((userBoard, index) => {
      if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
        deletedBoardIndex = index;
      }
    });
    user.boards.splice(deletedBoardIndex, 1);
    user = user.save();

    if (!user) {
      throw new CustomAPIError(
        `Error: could not remove board from ${member}'s account`,
        500
      );
    }
  });
}

async function _deleteBoardFromCurrentUser(user, boardId) {
  let deletedBoardIndex;
  user.boards.forEach((userBoard, index) => {
    if (JSON.stringify(userBoard._id) === JSON.stringify(boardId)) {
      deletedBoardIndex = index;
    }
  });
  user.boards.splice(deletedBoardIndex, 1);

  user.activeBoard =
    user.boards[user.boards.length - 1]._id || user.boards[0]._id;

  console.log(user.activeBoard);

  user = await user.save();
  if (!user) {
    throw new CustomAPIError(
      `Error: could not remove board from ${member}'s account`,
      500
    );
  }

  return user;
}

function _findModifiedBoardIndex(user, id) {
  let modifiedBoardIndex;
  user.boards.forEach((userBoard, index) => {
    if (JSON.stringify(userBoard._id) === JSON.stringify(id)) {
      modifiedBoardIndex = index;
    }
  });
  return modifiedBoardIndex;
}

async function _updateUsersBoardName(user, activeBoardId, board) {
  let modifiedBoardIndex = findModifiedBoardIndex(user, activeBoardId);
  console.log("modifiedBoardIndex " + modifiedBoardIndex);
  user.boards.splice(modifiedBoardIndex, 1, board);
}

module.exports = { createBoard, deleteBoard };
