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

  list.cards = [...list.cards, card];

  list = await list.save();

  if (!list) {
    throw new CustomAPIError("Error: could not update list.", 500);
  }

  let board = await Board.findById(currentUser.activeBoard);

  if (!board) {
    throw new NotFoundError("Error: could not update board.");
  }

  const modifiedListIndex = _findModifiedListIndex(board, list._id);

  board.lists.splice(modifiedListIndex, 1, list);

  board = await board.save();

  if (!board) {
    throw new CustomAPIError("Error: could not update board.", 500);
  }

  let user = await User.findById(currentUser._id);

  if (!user) {
    throw new NotFoundError("Error: user could not be updated.");
  }

  const modifiedBoardIndex = _findModifiedBoardIndex(user, board._id);

  user.boards.splice(modifiedBoardIndex, 1, board);

  user = await user.save();

  if (!user) {
    throw new CustomAPIError("Error: could not update user.", 500);
  }

  let userAndLists = { user: user, lists: board.lists };
  res.json(userAndLists);

  // card.save((err, card) => {
  //   if (err) {
  //     console.error(err);
  //     return res.json({
  //       err: "Error: could not create new card.",
  //     });
  //   }
  //   List.findById(listId, (err, list) => {
  //     if (err) {
  //       console.error(err);
  //       return res.json({
  //         err: "Error: could not update list.",
  //       });
  //     }
  //     list.cards = [...list.cards, card];
  //     list.save((err, list) => {
  //       if (err) {
  //         console.error(err);
  //         return res.json({
  //           err: "Error: could not update list.",
  //         });
  //       }
  //       Board.findById(currentUser.activeBoard, (err, board) => {
  //         if (err) {
  //           console.error(err);
  //           return res.json({
  //             err: "Error: could not update board.",
  //           });
  //         }
  //         let modifiedListIndex;
  //         board.lists.forEach((boardList, index) => {
  //           if (JSON.stringify(boardList._id) === JSON.stringify(list._id)) {
  //             modifiedListIndex = index;
  //           }
  //         });

  //         board.lists.splice(modifiedListIndex, 1, list);

  //         board.save((err, board) => {
  //           if (err) {
  //             console.error(err);
  //             return res.json({
  //               err: "Error: could not update list.",
  //             });
  //           }
  //           User.findById(currentUser._id, (err, user) => {
  //             if (err) {
  //               console.error(err);
  //               return res.json({
  //                 err: "Error: could not update current user.",
  //               });
  //             }
  //             let modifiedBoardIndex;
  //             user.boards.forEach((userBoard, index) => {
  //               if (
  //                 JSON.stringify(userBoard._id) === JSON.stringify(board._id)
  //               ) {
  //                 modifiedBoardIndex = index;
  //               }
  //             });
  //             user.boards.splice(modifiedBoardIndex, 1, board);
  //             user.save((err, user) => {
  //               if (err) {
  //                 console.error(err);
  //                 return res.json({
  //                   err: "Error: could not update current user.",
  //                 });
  //               }
  //               let userAndLists = { user: user, lists: board.lists };
  //               return res.json(userAndLists);
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

module.exports = { createCard };
