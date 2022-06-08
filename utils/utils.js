module.exports.handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
    return
  };
  if (err.name === 'CastError') {
    res.status(404).send({ message: `Данные не обнаружены: ${err.message}` });
    return
  };
  res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
};

module.exports.handleReqItemId = (item, res) => {
  if (item === null) {
    res.status(404).send({ message: `Объект отсутствует в базе` });
    return
  }
  res.send({ data: item });
}

module.exports.handleIncorrectId = (id, err, req, res) => {6
  if (`req.params.${id}.length` !== 24) {
    res.status(400).send({ message: `Введен некорректный ID объекта` });
    return
  }
  handleError(err, res);
};