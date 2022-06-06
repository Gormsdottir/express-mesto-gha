const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.massage }));
};

module.exports.getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Такого пользователя нет' });
      } else {
        res.send({ user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Нет пользователя с таким id' }));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err.massage }));
};
