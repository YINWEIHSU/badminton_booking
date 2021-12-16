const Court = require('../court')
const db = require('../../../config/mongoose')

db.once('open', async () => {
  console.log('mongodb connected!')
  await Court.create(
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
    })

  console.log('Court seeds insert completed!')
  console.log('database connection closed...')
  process.exit(0)

})