const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChecklistSchema = new Schema(
  {
    title: { type: String },
    items: { type: Array },
  },
  { timestamps: true },
)

const Checklist = mongoose.model('Checklist', ChecklistSchema)

module.exports = Checklist
