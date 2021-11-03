const mongoose = require('mongoose')
const Schema = mongoose.Schema
const applySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    requires: true
  },
  numberOfPeople: {
    type: Integer,
    required: true
  },
  remarks: {
    type: String,
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Apply', applySchema)