// grab the things we need
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var dateSchema = new Schema({
  date: { type: String, required: true },
  frequency: { type: Number, required: true }
}, {
  timestamps: true
})

// the schema is useless so far
// we need to create a model using it
var Date = mongoose.model('Date', dateSchema)

// make this available to our date in our Node applications
module.exports = Date
