var modelUser = require('../models/model.user')
var passwordHash = require('password-hash')
var passport = require('passport')
var jwt = require('jsonwebtoken')

var controllerUser = {
  /* get one user */
  getOneUser: function (req, res) {
    modelUser.findOne({ _id: req.params.id  }, function (err, data) {
      if (err) throw err
      res.json(data)
    })
  },
  /* create one user */
  addOneUser: function (req, res) {
    let newUser = modelUser({
      username: req.body.username,
      password: passwordHash.generate(req.body.password)
    })

    newUser.save(function (err, data) {
      if (err) throw err
      res.json('register success! login now :D')
    })
  },
  /* login */
  login: function (req, res) {
    var token = jwt.sign({ username: req.body.username }, 'live')
    res.send({ token: token, username: req.body.username})
  }

}

module.exports = controllerUser
