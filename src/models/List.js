// Make sure id and tags are properly defined in the schema

const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  id: {
    type: String,
    required: true,
    unique: true
  },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('List', listSchema);