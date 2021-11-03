const mongoose = require('mongoose')
const Schema = mongoose.Schema
const courtSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  }
})

module.exports = mongoose.model('Court', courtSchema)