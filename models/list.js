const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema(
  {
    name: { type: String },
    cards: { type: Array },
  },
  { timestamps: true },
)

const List = mongoose.model('List', ListSchema)

module.exports = List
