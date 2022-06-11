const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
// const { createCardValid } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// cardRouter.get('/', auth, getCards);
// cardRouter.post('/', auth, createCardValid, createCard);
// cardRouter.put('/:cardId/likes', auth, likeCard);
// cardRouter.delete('/:cardId', auth, deleteCard);
// cardRouter.delete('/:cardId/likes', auth, dislikeCard);

cardRouter.get('/', auth, getCards);

cardRouter.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(/^(http(s)?:\/\/)(?:www\.|(?!www))+[\W\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
}), createCard);

cardRouter.delete('/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

cardRouter.put('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),

}), likeCard);

cardRouter.delete('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = cardRouter;
