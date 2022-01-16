const CustomAPIError = require("../errors/customAPIError");
const NotFoundError = require("../errors/NotFoundError");
const asyncWrapper = require("../middleware/async");
const { User } = require("../models");
const { Board } = require("../models");
const { List } = require("../models");

const createList = asyncWrapper(async (req, res) => {
  let list = new List({ name: "", cards: [] });
  const activeBoard = req.body["activeBoard"];
  const username = req.cookies["user"];

  list = await list.save();

  if (!list) {
    throw CustomAPIError("Error: could not save new list.", 500);
  }

  let board = await Board.findById(activeBoard);

  if (!board) {
    throw NotFoundError("Error: could not add list to board");
  }

  board.lists = [...board.lists, list];

  board = await board.save();

  if (!board) {
    throw CustomAPIError("Error: could not save new list.", 500);
  }

  let user = await User.find({ username });

  if (!user) {
    throw NotFoundError("Error: could not add list to board");
  }

  user = await _updateUser(user[0], board);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);

  // list.save((err, list) => {
  //   routeHelper.handleErr(err, next);
  //   Board.findById(activeBoard, (err, board) => {
  //     if (err) {
  //       console.error(err);
  //       return res.json({ err: "Error: could not add new list." });
  //     }

  //     board.lists = [...board.lists, list];
  //     board.save((err, board) => {
  //       if (err) {
  //         console.error(err);
  //         return res.json({ err: "Error: could not add new list." });
  //       }
  //       User.find({ username: username }, (err, user) => {
  //         console.log("user " + JSON.stringify(user[0].boards[0]._id));
  //         console.log(JSON.stringify(board._id));
  //         if (err) {
  //           console.error(err);
  //           return res.json({ err: "Error: could not add new list." });
  //         }
  //         let oldBoard = user[0].boards.filter((json) => {
  //           return JSON.stringify(json._id) == JSON.stringify(board._id);
  //         })[0];

  //         console.log("oldBOard " + JSON.stringify(oldBoard));
  //         let oldBoardIndex = user[0].boards.indexOf(oldBoard);

  //         user[0].boards.splice(oldBoardIndex, 1, board);

  //         console.log("user boards " + JSON.stringify(user[0].boards));
  //         user[0].save((err, user) => {
  //           if (err) {
  //             console.error(err);
  //             return res.json({ err: "Error: could not add new list." });
  //           }
  //           console.log("server user " + user);
  //           console.log("board.lists " + board.lists);
  //           let userAndLists = { user: user, lists: board.lists };
  //           return res.json(userAndLists);
  //         });
  //       });
  //     });
  //   });
  // });
});

const changeListName = asyncWrapper(async (req, res) => {
  const name = req.body.componentName;
  const { currentUser, listId } = req.body;
  const activeBoardId = currentUser.activeBoard;

  let list = await List.findById(listId);

  if (!list) {
    throw new NotFoundError("Error: could not save new list name");
  }

  list.name = name;

  list = await list.save();

  if (!list) {
    throw new CustomAPIError("Error: could not save new list name", 500);
  }

  let board = await Board.findById(activeBoardId);

  if (!board) {
    throw new NotFoundError("Error: could not save new list name");
  }

  board = await _updateBoard(board, list);

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError("Error: could not save new list name");
  }

  let user = await _updateUser(currentUser, board);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);

  // List.findById(listId, (err, list) => {
  //   console.log("list ID", listId);
  //   if (err) {
  //     console.error(err);
  //     return res.json({ err: "Error: could not save new list name" });
  //   }

  //   list.name = name;
  //   console.log(list.name);
  //   list.save((err, list) => {
  //     Board.findById(activeBoardId, (err, board) => {
  //       if (err) {
  //         console.error(err);
  //         return res.json({ err: "Error: could not save new list name" });
  //       }
  //       let modifiedListIndex;
  //       board.lists.forEach((boardList, index) => {
  //         if (JSON.stringify(boardList._id) === JSON.stringify(listId)) {
  //           modifiedListIndex = index;
  //         }
  //       });
  //       board.lists.splice(modifiedListIndex, 1, list);
  //       User.findById(currentUser._id, (err, user) => {
  //         if (err) {
  //           console.error(err);
  //           return res.json({ err: "Error: could not save new list name" });
  //         }
  //         let modifiedBoardIndex;
  //         user.boards.forEach((userBoard, index) => {
  //           if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
  //             modifiedBoardIndex = index;
  //           }
  //         });
  //         user.boards.splice(modifiedBoardIndex, 1, board);
  //         user.save((err, user) => {
  //           if (err) {
  //             console.error(err);
  //             return res.json({ err: "Error: could not save new list name" });
  //           }
  //           let userAndLists = { user: user, lists: board.lists };
  //           return res.json(userAndLists);
  //         });
  //       });
  //     });
  //   });
  // });
});

//private

function _findModifiedBoardIndex(user, boardId) {
  let modifiedBoardIndex;
  user.boards.forEach((userBoard, index) => {
    if (JSON.stringify(userBoard._id) === JSON.stringify(boardId)) {
      modifiedBoardIndex = index;
    }
  });
  return modifiedBoardIndex;
}

function _findModifiedListIndex(board, listId) {
  let modifiedListIndex;
  board.lists.forEach((boardList, index) => {
    if (JSON.stringify(boardList._id) === JSON.stringify(listId)) {
      modifiedListIndex = index;
    }
  });
  return modifiedListIndex;
}

async function _updateBoard(board, list) {
  const modifiedListIndex = _findModifiedListIndex(board, list._id);

  board.lists.splice(modifiedListIndex, 1, list);

  try {
    board = await board.save();
  } catch (err) {
    console.log(err);
  }

  if (!board) {
    throw new CustomAPIError("Error: could not update board.", 500);
  }

  return board;
}

async function _updateUser(user, board) {
  const modifiedBoardIndex = _findModifiedBoardIndex(user, board._id);

  user.boards.splice(modifiedBoardIndex, 1, board);

  user = await user.save();

  if (!user) {
    throw new CustomAPIError("Error: could not update user.", 500);
  }

  return user;
}

module.exports = { createList, changeListName };
