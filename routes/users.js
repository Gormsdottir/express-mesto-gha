const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  userAvatarValid,
  loginValid,
  registerValid,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
} = require('../controllers/users');

usersRouter.get('/', auth, getUsers);
usersRouter.get('/:userId', auth, getUserById);
usersRouter.get('/me', auth, getUserMe);
usersRouter.post('/signup', registerValid, createUser);
usersRouter.patch('/me', auth, userAvatarValid, updateUserInfo);
usersRouter.patch('/me/avatar', userAvatarValid, updateUserAvatar);
usersRouter.post('/signin', loginValid, login);

module.exports = usersRouter;
