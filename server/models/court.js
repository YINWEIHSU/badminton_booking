const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courtSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, default: '' },
  phone: { type: String, default: '' }
})

module.exports = mongoose.model('Court', courtSchema)