const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const languageSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
