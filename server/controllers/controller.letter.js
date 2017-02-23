var modelLetter = require('../models/model.letter')

var controllerLetter = {
  /* get all data letter from database */
  getAllLetter: function (req, res) {
    modelLetter.find({}, function (err, data) {
      if (err) throw err
      res.json(data)
    })
  },
  /* search letter and frequency */
  searchLetter: function (req, res) {},
  /* create one Letter to database */
  addOneLetter: function (req, res) {
    let newLetter = modelLetter({
      letter: req.body.letter,
      frequency: req.body.frequency
    })
  },
  /* edit one letter from database */
  editOneLetter: function (req, res) {
    modelLetter.findOneAndUpdate({ _id: req.body.id }, { letter: req.body.letter, frequency: req.body.frequency }, function (err, data) {
      if (err) throw err
      res.json(data)
    })
  },
  /* delete one letter from database */
  deleteOneLetter: function (req, res) {
    modelLetter.findOneAndRemove({ _id: req.body.id }, function (err, data) {
      if (err) throw err
      res.json(data)
    })
  },
  /* insert many document to database */
  seederLetter: function (req, res) {}
}

module.exports = controllerLetter
