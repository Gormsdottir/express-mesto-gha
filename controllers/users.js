const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const WrongDataError = require('../errors/WrongDataError');
const AuthError = require('../errors/AuthError');
const DuplicatedError = require('../errors/DuplicatedError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserById = (req, res) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    } else res.send({ user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    } else res.status(500).send({ message: 'Ошибка' });
  });

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    avatar,
    about,
    password,
    email,
  } = req.body;

  return bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }).then(() => res.send({
    data: {
      name,
      about,
      avatar,
      email,
    },
  })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError('Неверные данные'));
        return;
      }
      if (err.code === 11000) {
        next(new DuplicatedError('Такой пользователь уже существует'));
        return;
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такой пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError('Неверные данные'));
        return;
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такой пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError('Неверные данные'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new AuthError('Указан неверный e-mail или пароль'));
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
