const { createHmac } = require('crypto')
const { redisUtils } = require('../utils/redisUtil')

async function verifyToken(req, res, next) {
  const checkBearer = req.headers.authorization.startsWith("Bearer ")

  if (!checkBearer) {
    return new Error('authorization not support!')
  }
  const cacheResult = await redisUtils.getCaches('token')
  const token = req.headers.authorization.split(" ")[1]

  if (!!cacheResult && cacheResult === token) {
    const jwtToken = authUtil.deconstructToken(token)
    const hmac = createHmac(process.env.JWT_ALGO, process.env.JWT_SECRET);
    const sign = hmac.update(`${jwtToken.headerReq}.${jwtToken.contentReq}`).digest('hex')

    if (sign === jwtToken.signReq) {
      next()
    } else {
      return new Error('token not valid!')
    }
  } else {
    //之後要改成 redirect
    return res.json({ message: 'authorization denied' })
  }
}

class authUtil {
  static deconstructToken(args) {
    const [headerReq, contentReq, signReq] = args.split('.')
    return {
      headerReq,
      contentReq,
      signReq
    }
  }
  static authenticated(req, res, next) {
    return verifyToken(req, res, next)
  }
}

module.exports = authUtil