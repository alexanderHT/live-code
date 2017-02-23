var jwt = require('jsonwebtoken')

var helperVerify = {
  verify: function (req, res, next) {
    if (req.headers.token == 'null') {
      res.json("you don't have access")
    }else {
      if (jwt.verify(req.headers.token, 'live')) {
        next()
      }else {
        res.json('your token already exp, so please login again')
      }
    }
  }

}

module.exports = helperVerify
