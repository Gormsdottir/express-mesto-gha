const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Нужно заполнить это поле'],
    minlength: [2, 'Имя пользователя слишком короткое'],
    maxlength: [30, 'Имя пользователя слишком длинное'],
  },
  about: {
    type: String,
    required: [true, 'Нужно заполнить это поле'],
    minlength: [2, 'Должно быть не меньше 2 символов. Введено'],
    maxlength: [30, 'Должно быть не больше 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Нужно заполнить это поле'],
  },
});

module.exports = mongoose.model('user', userSchema);
