const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  name: { type: String, required: true },
  cards: { type: Array, required: true },
})

const List = mongoose.model('List', ListSchema)

module.exports = List
