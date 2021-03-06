const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardSchema = new Schema(
  {
    name: { type: String },
    lists: { type: Array, required: true },
    members: { type: Array },
  },
  { timestamps: true },
)

const Board = mongoose.model('Board', BoardSchema)

module.exports = Board
