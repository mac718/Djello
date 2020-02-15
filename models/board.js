const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardSchema = new Schema({
  name: { type: String, required: true },
  lists: { type: Array, required: true },
})

const User = mongoose.model('Board', BoardSchema)

module.exports = User
