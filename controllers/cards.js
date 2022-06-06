const card = require('../models/card');

const getCards = (_, res) => {
  card
    .find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        res
          .status(404)
          .send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }

      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card
    .create({ name, link, owner })
    .then((cards) => {
      if (!name || !link) {
        res
          .status(404)
          .send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }

      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

const likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        res
          .status(404)
          .send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
        return;
      }
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

const dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        res
          .status(404)
          .send({ message: 'Карточка с указанным id не найдена.' });
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для снятия лайка.',
        });
        return;
      }
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};