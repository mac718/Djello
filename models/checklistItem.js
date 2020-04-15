const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChecklistItemSchema = new Schema(
  {
    content: { type: String },
    checked: { type: Boolean },
  },
  { timestamps: true },
)

const ChecklistItem = mongoose.model('ChecklistItem', ChecklistItemSchema)

module.exports = ChecklistItem
