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

const whitelist = ['http://localhost:3001', 'http://example2.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: false,
// });


mongoose.connect('mongodb://root:root_password@localhost:27017/mestodb?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
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
  console.log(`App listening on port ${PORT}`);
});
