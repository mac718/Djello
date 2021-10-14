const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const List = require("./list").schema;

const BoardSchema = new Schema(
  {
    name: { type: String },
    lists: { type: [List], required: true },
    members: { type: Array },
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
