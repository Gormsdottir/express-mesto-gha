const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
    return;
  }
  if (err.name === 'CastError') {
    res.status(404).send({ message: `Данные не обнаружены: ${err.message}` });
    return;
  }
  res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
};

const handleReqItemId = (item, res) => {
  if (item === null) {
    res.status(404).send({ message: 'Объект не найден' });
    return;
  }
  res.send({ data: item });
};

const handleIncorrectId = (id, err, req, res) => {
  if (`req.params.${id}.length` !== 24) {
    res.status(400).send({ message: 'Введен некорректный ID' });
    return;
  }
  handleError(err, res);
};

module.exports = {
  handleError,
  handleReqItemId,
  handleIncorrectId,
};
