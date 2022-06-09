const User = require('../models/user');
const { handleError, handleIncorrectId, handleReqItemId } = require('../utils/utils');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => handleReqItemId(user, res))
    .catch((err) => handleIncorrectId('userId', err, req, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с указанным _id не найден');
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
        throw new NotFound('Пользователь с указанным _id не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
