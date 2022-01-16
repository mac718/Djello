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

  user = await _updateUser(user, board);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);
});

const deleteList = asyncWrapper(async (req, res) => {
  const { listId, currentUser } = req.body;

  let list = await List.findById(listId);

  console.log("listerino", list);

  if (!list) {
    throw new NotFoundError("Error: could not delete list.");
  }

  list = await list.delete();

  if (!list) {
    throw new CustomAPIError("Error: could not delete list.", 500);
  }

  let board = await Board.findById(currentUser.activeBoard);

  if (!board) {
    throw new NotFoundError("Error: could not delete list.");
  }

  let deletedListIndex;
  board.lists.forEach((boardList, index) => {
    if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
      deletedListIndex = index;
    }
  });
  board.lists.splice(deletedListIndex, 1);

  board = await board.save();
  if (!board) {
    throw new CustomAPIError("Error: could not delete list.", 500);
  }

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError("Error: could not delete list.");
  }

  user = await _updateUser(user, board);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);

  // List.findById(listId, (err, list) => {
  //   if (err) {
  //     console.error(err);
  //     return res.json({ err: "Error: could not delete list." });
  //   }
  //   list.delete((err, list) => {
  //     if (err) {
  //       console.error(err);
  //       return res.json({ err: "Error: could not delete list." });
  //     }
  //     Board.findById(currentUser.activeBoard, (err, board) => {
  //       if (err) {
  //         console.error(err);
  //         return res.json({ err: "Error: could not delete list." });
  //       }
  //       let deletedListIndex;
  //       board.lists.forEach((boardList, index) => {
  //         if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
  //           deletedListIndex = index;
  //         }
  //       });
  //       board.lists.splice(deletedListIndex, 1);
  //       board.save((err, board) => {
  //         if (err) {
  //           console.error(err);
  //           return res.json({ err: "Error: could not delete list." });
  //         }
  //         User.findById(currentUser._id, (err, user) => {
  //           let modifiedBoardIndex;
  //           user.boards.forEach((userBoard, index) => {
  //             if (JSON.stringify(userBoard._id) === JSON.stringify(board._id)) {
  //               modifiedBoardIndex = index;
  //             }
  //           });
  //           user.boards.splice(modifiedBoardIndex, 1, board);
  //           user.save((err, user) => {
  //             if (err) {
  //               console.error(err);
  //               return res.json({ err: "Error: could not delete list." });
  //             }
  //             let userAndLists = { user: user, lists: board.lists };
  //             return res.json(userAndLists);
  //           });
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

module.exports = { createList, changeListName, deleteList };
