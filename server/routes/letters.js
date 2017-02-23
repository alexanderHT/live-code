var express = require('express')
var router = express.Router()
const controllerLetter = require('../controllers/controller.letter')
// const helperVerify = require('../helpers/helper.verify')

/* http://localhost:3000/api/letters | get all data letter from database */
router.get('/', controllerLetter.getAllLetter)
/* http://localhost:3000/api/letters/search | search letter and frequency */
router.post('/search', controllerLetter.searchLetter)
/* http://localhost:3000/api/letters | create one Letter to database */
router.post('/', controllerLetter.addOneLetter)
/* http://localhost:3000/api/letters | edit one letter from database */
router.put('/', controllerLetter.editOneLetter)
/* http://localhost:3000/api/letters | delete one letter from database */
router.delete('/', controllerLetter.deleteOneLetter)
/* http://localhost:3000/api/letters/seederLetter | insert many document to database */
router.get('/seederLetter', controllerLetter.seederLetter)

module.exports = router
