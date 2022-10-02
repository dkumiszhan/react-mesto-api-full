require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const { cardRoutes } = require('./routes/cards');
const { userRoutes } = require('./routes/users');
const notFoundHandler = require('./routes/notFound');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

const whitelist = [process.env.BASE_URL_API, process.env.BASE_URL_STATIC];
const corsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[A-Za-z0-9._~:/?[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(requestLogger);
app.use(userRoutes);
app.use(cardRoutes);
app.use(errorLogger);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(process.env);
  console.log('whitelist is ', whitelist);
  console.log(`App listening on port ${PORT}`);
});
