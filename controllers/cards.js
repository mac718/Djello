const CustomAPIError = require("../errors/customAPIError");
const NotFoundError = require("../errors/NotFoundError");
const asyncWrapper = require("../middleware/async");
const { User } = require("../models");
const { Board } = require("../models");
const { List } = require("../models");
const { Card } = require("../models");
const FileUpload = require("../services/file_upload");

const createCard = asyncWrapper(async (req, res) => {
  let listId = req.body.listId;
  let title = req.body.title;
  let currentUser = req.body.currentUser;
  let date = new Date();
  let activity = [`${currentUser.username} created card at ${date.toString()}`];
  let card = new Card({ title, activity });

  card = await card.save();

  if (!card) {
    throw new CustomAPIError("Error: could not create new card.", 500);
  }

  let list = await List.findById(listId);

  if (!list) {
    throw new NotFoundError("Error: could not save card to list.");
  }

  list = await _addCardToList(list, card);

  let board = await Board.findById(currentUser.activeBoard);

  if (!board) {
    throw new NotFoundError("Error: could not update board.");
  }

  board = await _updateBoard(board, list);

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError("Error: user could not be updated.");
  }

  user = await _updateUser(user, board);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);
});

const deleteCard = asyncWrapper(async (req, res) => {
  const { cardId, listId, currentUser } = req.body;

  let card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError("Error: could not delete card.");
  }

  card = await card.delete();

  if (!card) {
    throw new CustomAPIError("Error: could not delete card.", 500);
  }

  let list = await List.findById(listId);

  list = await _deleteCardFromList(list, card);

  let board = await Board.findById(currentUser.activeBoard);

  if (!board) {
    throw new NotFoundError("Error: could not delete card.");
  }

  board = await _updateBoard(board, list);

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError("Error: could not delete card.");
  }

  user = await _updateUser(user, board);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);
});

const updateCardTitle = asyncWrapper(async (req, res) => {
  const { listId, cardId, cardTitle, currentUser } = req.body;

  let card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError("Error: could not set title.");
  }

  if (cardTitle === "") {
    card.title = "Title...";
  } else {
    card.title = cardTitle;
  }

  card = await _updateCardActivity(card, currentUser);

  let list = await List.findById(listId);

  if (!list) {
    throw new NotFoundError("Error: could not set title.");
  }

  list = await _updateList(list, card);

  let board = await Board.findById(currentUser.activeBoard);

  if (!board) {
    throw new NotFoundError("Error: could not set title.");
  }

  board = await _updateBoard(board, list);

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError("Error: could not set title.");
  }

  user = await _updateUser(user, board);

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);

  // Card.findById(cardId, (err, card) => {
  //   if (err) {
  //     console.error(err);
  //     return res.json({
  //       err: "Error: could not update card title.",
  //     });
  //   }

  //   if (cardTitle === "") {
  //     card.title = "Title...";
  //   } else {
  //     card.title = cardTitle;
  //   }

  //   card.save((err, card) => {
  //     if (err) {
  //       console.error(err);
  //       return res.json({
  //         err: "Error: could not update card title.",
  //       });
  //     }
  //     console.log(JSON.stringify(card));
  //     List.findById(listId, (err, list) => {
  //       console.log("list id " + listId);
  //       if (err) {
  //         console.error(err);
  //         return res.json({
  //           err: "Error: could not update list.",
  //         });
  //       }
  //       let modifiedCardIndex;
  //       list.cards.forEach((listCard, index) => {
  //         if (JSON.stringify(listCard._id) === JSON.stringify(card._id)) {
  //           modifiedCardIndex = index;
  //         }
  //       });

  //       list.cards.splice(modifiedCardIndex, 1, card);
  //       list.save((err, list) => {
  //         if (err) {
  //           console.error(err);
  //           return res.json({
  //             err: "Error: could not update list.",
  //           });
  //         }
  //         Board.findById(currentUser.activeBoard, (err, board) => {
  //           if (err) {
  //             console.error(err);
  //             return res.json({
  //               err: "Error: could not update board.",
  //             });
  //           }
  //           let modifiedListIndex;
  //           board.lists.forEach((boardList, index) => {
  //             if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
  //               modifiedListIndex = index;
  //             }
  //           });

  //           board.lists.splice(modifiedListIndex, 1, list);

  //           board.save((err, board) => {
  //             if (err) {
  //               console.error(err);
  //               return res.json({
  //                 err: "Error: could not update board.",
  //               });
  //             }
  //             User.findById(currentUser._id, (err, user) => {
  //               if (err) {
  //                 console.error(err);
  //                 return res.json({
  //                   err: "Error: could not update current user.",
  //                 });
  //               }
  //               let modifiedBoardIndex;
  //               user.boards.forEach((userBoard, index) => {
  //                 if (
  //                   JSON.stringify(userBoard._id) === JSON.stringify(board._id)
  //                 ) {
  //                   modifiedBoardIndex = index;
  //                 }
  //               });
  //               user.boards.splice(modifiedBoardIndex, 1, board);
  //               user.save((err, user) => {
  //                 if (err) {
  //                   console.error(err);
  //                   return res.json({
  //                     err: "Error: could not update current user.",
  //                   });
  //                 }

  //                 let userAndLists = { user: user, lists: board.lists };
  //                 return res.json(userAndLists);
  //               });
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
});

//private

function _findModifiedListIndex(board, listId) {
  let modifiedListIndex;
  board.lists.forEach((boardList, index) => {
    if (JSON.stringify(boardList._id) === JSON.stringify(listId)) {
      modifiedListIndex = index;
    }
  });
  return modifiedListIndex;
}

function _findModifiedBoardIndex(user, boardId) {
  let modifiedBoardIndex;
  user.boards.forEach((userBoard, index) => {
    if (JSON.stringify(userBoard._id) === JSON.stringify(boardId)) {
      modifiedBoardIndex = index;
    }
  });
  return modifiedBoardIndex;
}

function _findModifiedCardIndex(list, cardId) {
  let modifiedCardIndex;
  list.cards.forEach((listCard, index) => {
    if (JSON.stringify(listCard._id) === JSON.stringify(cardId)) {
      modifiedCardIndex = index;
    }
  });
  return modifiedCardIndex;
}

async function _addCardToList(list, card) {
  list.cards = [...list.cards, card];

  list = await list.save();

  if (!list) {
    throw new CustomAPIError("Error: could not update list.", 500);
  }

  return list;
}

async function _deleteCardFromList(list, card) {
  let deletedCardIndex;
  list.cards.forEach((listCard, index) => {
    if (JSON.stringify(listCard._id) === JSON.stringify(card._id)) {
      deletedCardIndex = index;
    }
  });

  list.cards.splice(deletedCardIndex, 1);
  list = await list.save();

  if (!list) {
    throw new CustomAPIError("Error: could not delete card.", 500);
  }

  return list;
}

async function _updateBoard(board, list) {
  console.log("list", list);
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

async function _updateList(list, card) {
  let modifiedCardIndex = _findModifiedCardIndex(list, card._id);

  list.cards.splice(modifiedCardIndex, 1, card);

  list = await list.save();

  if (!list) {
    throw new CustomAPIError("Error: could not set title.", 500);
  }

  return list;
}

async function _updateCardActivity(card, currentUser) {
  let date = new Date();
  card.activity = [
    ...card.activity,
    `${currentUser.username} edited the title at ${date.toString()}`,
  ];
  card = await card.save();

  if (!card) {
    throw new CustomAPIError("Error: could not set title", 500);
  }

  return card;
}

module.exports = { createCard, deleteCard, updateCardTitle };
