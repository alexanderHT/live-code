var express = require('express')
var router = express.Router()
const controllerUser = require('../controllers/controller.user')
const helperVerify = require('../helpers/helper.verify')
var passport = require('passport')
var jwt = require('jsonwebtoken')
// verify

/* GET user. */
router.get('/:id', helperVerify.verify , controllerUser.getOneUser)
/* http://localhost:3000/api/users/register | register an user */
router.post('/register', controllerUser.addOneUser)
/* http://localhost:3000/api/users/login | user login */
router.post('/login', passport.authenticate('test-login'), controllerUser.login)

module.exports = router
