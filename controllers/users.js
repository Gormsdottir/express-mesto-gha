/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const WrongDataError = require('../errors/WrongDataError');
const AuthError = require('../errors/AuthError');
const DuplicatedError = require('../errors/DuplicatedError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserMe = (res, req) => {
  User.findById(req.user._id)
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((err) => next(err));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new WrongDataError('Неверный ID'));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(201).send({
      data: {
        name,
        about,
        avatar,
        email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError('Введены неверные данные'));
        return;
      }
      if (err.code === 11000) {
        next(new DuplicatedError('Такой пользователь уже существует'));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким ID');
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким IDs');
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })

    .catch((err) => {
      if (err.name === 'Error') {
        next(new AuthError('Неверный e-mail или пароль'));
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserMe,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
