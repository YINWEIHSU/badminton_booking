const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    requires: true
  },
  courtId: {
    type: Schema.Types.ObjectId,
    ref: 'Court',
    index: true,
    requires: true
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  Cost: {
    type: Number,
    required: true
  },
  requiredPeople: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Post', postSchema)