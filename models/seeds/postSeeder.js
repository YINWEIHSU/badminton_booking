const mongoose = require('mongoose')
const Post = require('../post')
const User = require('../user')
const Court = require('../court')

mongoose.connect('mongodb://127.0.0.1/badminton-booking', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')
  const user = await User.findOne({ name: 'group1' })
  const court = await Court.findOne({ name: '大安' })
  await Post.create({
    userId: user.id,
    courtId: court.id,
    date: '10/11',
    startTime: '10:00',
    endTime: '11:00',
    Cost: 200,
    requiredPeople: 4,
    remarks: '限中級',
  })

  console.log('Post seeds insert completed!')

  console.log('database connection closed...')
  process.exit()

})