const NotFoundError = require('./NotFoundError');

module.exports.PageNotFound = (req, res, next) => {
  next(
    new NotFoundError('Страница не найдена'),
  );
};
