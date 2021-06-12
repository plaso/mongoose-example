const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 0
  },
  color: {
    type: String,
    required: true,
    enum: ["Black", "White", "Brown"]
  },
  attributes: {
    type: [String],
    default: []
  },
  avatarUrl: {
    type: String,
    default: 'http://placekitten.com/200/300'
  }
})

const Cat = mongoose.model('Cat', catSchema)

module.exports = Cat