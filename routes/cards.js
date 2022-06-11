const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createCardValid } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, createCardValid, createCard);
router.put('/:cardId/likes', auth, likeCard);
router.delete('/:cardId', auth, deleteCard);
router.delete('/:cardId/likes', auth, dislikeCard);

module.exports = router;
