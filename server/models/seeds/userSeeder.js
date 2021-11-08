const mongoose = require('mongoose')
const User = require('../user')
mongoose.connect('mongodb://127.0.0.1/badminton-booking', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  User.create({
    name: 'user1',
    nickname: 'USER1',
    phone: '0912345678',
    lineId: 'user1LineID',
    email: 'user1@example.com',
    password: '12345678',
  },
    {
      name: 'group1',
      nickname: 'GROUP1',
      phone: '0987654321',
      lineId: 'group1LineID',
      email: 'group1@example.com',
      password: '12345678',
      isGroup: true,
    }).then(() => {
      console.log('User seeds insert completed!')
      console.log('database connection closed...')
      process.exit()
    })

})