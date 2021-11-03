const mongoose = require('mongoose')
const Apply = require('../apply')
const Post = require('../post')
const User = require('../user')
mongoose.connect('mongodb://127.0.0.1/badminton-booking', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')
  const post = await Post.findOne({ date: '10/11' })
  const user = await User.findOne({ name: 'user1' })
  await Apply.create({
    userId: user.id,
    postId: post.id,
    numberOfPeople: 3,
    remarks: 'No remarks'
  })
  console.log('Apply seeds insert completed!')
  console.log('database connection closed...')
  process.exit()
})