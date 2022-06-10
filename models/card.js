const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Нужно заполнить это поле'],
    minlength: [2, 'Должно быть не меньше 2 символов}'],
    maxlength: [30, 'Должно быть не больше 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Нужно заполнить это поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Нужно заполнить это поле'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
