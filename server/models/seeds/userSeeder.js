const bcrypt = require('bcryptjs')
const User = require('../user')
const db = require('../../../config/mongoose')

db.once('open', async () => {
  console.log('mongodb connected!')
  await User.create({
    name: 'user1',
    nickname: 'USER1',
    phone: '0912345678',
    lineId: 'user1LineID',
    email: 'user1@example.com',
    password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
  },
    {
      name: 'group1',
      nickname: 'GROUP1',
      phone: '0987654321',
      lineId: 'group1LineID',
      email: 'group1@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      isGroup: true,
    })

  console.log('User seeds insert completed!')
  console.log('database connection closed...')
  process.exit(0)

})