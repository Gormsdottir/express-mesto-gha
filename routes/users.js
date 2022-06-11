const router = require('express').Router();
const auth = require('../middlewares/auth');
const { userAvatarValid } = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getUserMe,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.get('/me', auth, getUserMe);
router.patch('/me', auth, userAvatarValid, updateUserInfo);
router.patch('/me/avatar', userAvatarValid, updateUserAvatar);

module.exports = router;
