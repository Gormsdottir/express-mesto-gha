const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb');


app.use((req, res, next) => {
  req.user = {
    _id: '62a0ea9d8c258882f9f7917d'
  };

  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use((req, res) => res.status(404).send({ message: 'Невозможно отобразить страницу' }));

app.listen(PORT);