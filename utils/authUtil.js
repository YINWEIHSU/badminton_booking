const { createHmac } = require('crypto')

function verifyToken(req, res, next) {
  if (req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1]
    const jwtToken = authUtil.deconstructToken(token)
    const hmac = createHmac(process.env.JWT_ALGO, process.env.JWT_SECRET);
    const sign = hmac.update(`${jwtToken.headerReq}.${jwtToken.contentReq}`).digest('hex')
    if (sign === jwtToken.signReq) {
      next()
    } else {
      return new Error('request not valid!')
    }
  } else {
    return new Error('authorization not support!')
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