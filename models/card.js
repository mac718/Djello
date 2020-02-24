const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  content: { type: String, required: true },
})

const Card = mongoose.model('Card', CardSchema)

module.exports = Card
