const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    members: { type: Array },
    activity: { type: Array },
    checklists: { type: Array },
    attachments: { type: Array },
  },
  { timestamps: true },
)

const Card = mongoose.model('Card', CardSchema)

module.exports = Card
