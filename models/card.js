const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  members: { type: Array },
})

const Card = mongoose.model('Card', CardSchema)

module.exports = Card
