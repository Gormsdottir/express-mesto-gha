const Cards = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const WrongDataError = require('../errors/WrongDataError');
const DeleteError = require('../errors/DeleteError');
const ServerError = require('../errors/ServerError');

const getCards = (_, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new WrongDataError('Переданы некорректные данные при создании карточки)',
        ));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

const likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new WrongDataError({ message: err.errorMessage }));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new WrongDataError({ message: 'Переданы некорректные данные' }));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId).then((card) => {
    if (!card) {
      return next(new NotFoundError('Карточка с указанным id не найдена.'));
    };
    if (req.user._id === card.owner.toString()) {
      Cards.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.send({ data: card });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new WrongDataError('неверные данные'));
            return;
          }
          next(err);
        });
      return;
    }
    throw new DeleteError('Невозможно удалить карту других пользователей');
  })
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
