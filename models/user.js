const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const 

const UserSchema = new Schema({
  username: {type: string, required: true, unique: true},
  passwordHash: { type: string, required: true }
});
