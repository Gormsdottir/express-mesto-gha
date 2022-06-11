const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const {
//   userAvatarValid,
//   loginValid,
//   registerValid,
// } = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
} = require('../controllers/users');

// usersRouter.get('/', auth, getUsers);
// usersRouter.get('/:userId', auth, getUserById);
// usersRouter.get('/me', auth, getUserMe);
// usersRouter.post('/signup', registerValid, createUser);
// usersRouter.patch('/me', auth, userAvatarValid, updateUserInfo);
// usersRouter.patch('/me/avatar', userAvatarValid, updateUserAvatar);
// usersRouter.post('/signin', loginValid, login);

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserMe);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

usersRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/),
  }),
}), createUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), updateUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(http(s)?:\/\/)(?:www\.|(?!www))+[\W\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
}), updateUserAvatar);

usersRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = usersRouter;
