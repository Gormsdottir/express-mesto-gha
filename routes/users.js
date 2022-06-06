// const usersRouter = require('express').Router();
// const path = require('path');

// const contents = require('../data/users.json');

// usersRouter.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../data/users.json'));
// });
// usersRouter.get('/:id', (req, res) => {
//   const user = contents.find(({ _id: id }) => id === req.params.id);
//   if (!user) {
//     res.status(404).send({
//       message: 'Нет пользователя с таким id',
//     });
//     return;
//   }
//   res.send(user);
// });

// module.exports = usersRouter;

const usersRouter = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', getUser);

usersRouter.post('/', createUser);

module.exports = usersRouter;
