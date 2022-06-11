const cardRouter = require('express').Router();
const auth = require('../middlewares/auth');
const { createCardValid } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', auth, getCards);
cardRouter.post('/', auth, createCardValid, createCard);
cardRouter.put('/:cardId/likes', auth, likeCard);
cardRouter.delete('/:cardId', auth, deleteCard);
cardRouter.delete('/:cardId/likes', auth, dislikeCard);

module.exports = cardRouter;
