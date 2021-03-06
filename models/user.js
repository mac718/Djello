const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    boards: { type: Array },
    activeBoard: { type: String },
  },
  { timestamps: true },
)

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

UserSchema.virtual('password')
  .get(function() {
    return this._password
  })
  .set(function(value) {
    this._password = value
    this.passwordHash = bcrypt.hashSync(value, 8)
  })

const User = mongoose.model('User', UserSchema)

module.exports = User
