const { createHmac } = require('crypto')

function generateHeader() {
  return header = {
    algo: process.env.JWT_ALGO,
    type: 'JWT'
  }
}

function generateContent(userId) {
  return content = {
    userId,
    iat: new Date().valueOf()
  }
}

class jwtUtil {
  static encoded(args) {
    return Buffer.from(JSON.stringify(args)).toString(process.env.ENCODED_METHOD)
  }
  static decoded(args) {
    return Buffer.from(args, process.env.ENCODED_METHOD).toString(process.env.DECODED_METHOD)
  }
  static generateJWT(id) {
    const encodedHeader = this.encoded(generateHeader())
    const encodedContent = this.encoded(generateContent(id))
    const sign = this.generateSign(encodedHeader, encodedContent)
    return `${encodedHeader}.${encodedContent}.${sign}`
  }
  static generateSign(header, content) {
    const hmac = createHmac(process.env.JWT_ALGO, process.env.JWT_SECRET);
    return hmac.update(`${header}.${content}`).digest('hex')
  }
}

module.exports = {
  jwtUtil
}