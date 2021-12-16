const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  nickname: { type: String, default: '' },
  phone: { type: String, default: '' },
  lineId: { type: String, default: '' },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isGroup: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)