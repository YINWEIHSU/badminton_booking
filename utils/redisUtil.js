const Redis = require('ioredis')

// 最久保留10天
const MAX_EXPIRE_TIME = 60 * 60 * 24 * 10;

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB
}

function getConnection() {
  return new Redis(connection)
}

class redisUtils {
  static async setCaches(key, value, expiredSeconds = 0) {
    try {
      const keyString = JSON.stringify(key)
      const valueString = JSON.stringify(value)
      const finalExpiredTimes = !!expiredSeconds ? expiredSeconds : MAX_EXPIRE_TIME
      const connection = getConnection()

      return await connection.set(keyString, valueString, 'EX', Number(finalExpiredTimes))
        .then(() => console.log(`redis set ${key} success`))
    } catch (err) {
      console.trace(err)
    }
  }

  static async getCaches(key) {
    try {
      const connection = getConnection()
      const result = await connection.get(JSON.stringify(key))
      return JSON.parse(result)
    } catch (err) {
      console.trace(err)
    }
  }
}

module.exports = {
  redisUtils
}