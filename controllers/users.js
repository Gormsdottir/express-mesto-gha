const user = require('../models/user');

const getUsers = (_, res) => {
  user
    .find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;

  user
    .findById(id)
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }

      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user
    .create({ name, about, avatar })
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
        return;
      }

      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const updateUser = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;

  user
    .findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        res.status(400).send({ message: `${fields} некорректно` });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;

  user
    .findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};