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
  searchLetter: function (req, res) {
    console.log(req.body)
    let letter_input = req.body.letter || ''
    let frequency_input = Number(req.body.frequency) || 0

    if (letter_input && frequency_input) {
      modelLetter.find({ letter: letter_input, frequency: frequency_input }, function (err, data) {
        if (err) console.log(err)
        res.json(data)
      })
    }else {
      modelLetter.find({}).or([{ letter: letter_input }, { frequency: frequency_input }]).exec(function (err, data) {
        if (err) console.log(err)
        res.json(data)
      })
    }
  },
  /* create one Letter to database */
  addOneLetter: function (req, res) {
    let newLetter = modelLetter({
      letter: req.body.letter,
      frequency: req.body.frequency
    })

    newLetter.save(function (err, data) {
      if (err) throw err
      res.json(data)
    })
  },
  /* edit one letter from database */
  editOneLetter: function (req, res) {
    modelLetter.findOneAndUpdate({ _id: req.body.id }, { letter: req.body.letter, frequency: req.body.frequency }, { new: true } , function (err, data) {
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
  seederLetter: function (req, res) {
    var arrayLetter =
    [{
      letter: 'a',
      frequency: 1
    }, {
      letter: 'a',
      frequency: 2
    }, {
      letter: 'a',
      frequency: 3
    }, {
      letter: 'a',
      frequency: 4
    }, {
      letter: 'a',
      frequency: 5
    }, {
      letter: 'b',
      frequency: 1
    }, {
      letter: 'b',
      frequency: 2
    }, {
      letter: 'b',
      frequency: 3
    }, {
      letter: 'b',
      frequency: 4
    }, {
      letter: 'c',
      frequency: 1
    }, {
      letter: 'c',
      frequency: 2
    }, {
      letter: 'c',
      frequency: 3
    }, {
      letter: 'c',
      frequency: 4
    }]
    modelLetter.collection.insert(arrayLetter, function (err, data) {
      if (err) throw err
      let temp = data.ops
      res.json(temp)
    })
  },
  removeLetter: function (req, res) {
    modelLetter.remove({}, function (err, data) {
      if (err) throw err
      console.log(' Data hes been deleted : ' + data)
    })
  }
}

module.exports = controllerLetter
