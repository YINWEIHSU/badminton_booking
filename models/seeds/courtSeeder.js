const mongoose = require('mongoose')
const Court = require('../court')
mongoose.connect('mongodb://127.0.0.1/badminton-booking', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Court.create(
    {
      name: '大安',
      address: '台北市大安區辛亥路三段55號',
      phone: '02-23770300',
    },
    {
      name: '中正',
      address: '台北市中正區信義路一段1號',
      phone: '02-23770300',
    },
    {
      name: '南港',
      address: '台北市南港區玉成街69號',
      phone: '02-26532279',
    }).then(() => {
      console.log('Court seeds insert completed!')
      console.log('database connection closed...')
      process.exit()
    })

})