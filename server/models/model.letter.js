// grab the things we need
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var letterSchema = new Schema({
  letter: { type: String, required: true },
  frequency: { type: Number, required: true }
}, {
  timestamps: true
})

// the schema is useless so far
// we need to create a model using it
var Letter = mongoose.model('Letter', letterSchema)

// make this available to our letter in our Node applications
module.exports = Letter
