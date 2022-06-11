const router = require('express').Router();
const auth = require('../middlewares/auth');
const { userAvatarValid, loginValid } = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getUserMe,
  updateUserInfo,
  updateUserAvatar,
  login,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.get('/me', auth, getUserMe);
router.patch('/me', auth, userAvatarValid, updateUserInfo);
router.patch('/me/avatar', userAvatarValid, updateUserAvatar);
router.post('/signin', loginValid, login);

module.exports = router;
