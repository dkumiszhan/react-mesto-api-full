require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const InternalServerError = require('../middlewares/errors/internalServerError');
const BadRequestError = require('../middlewares/errors/badRequestError');
const NotFoundError = require('../middlewares/errors/notFoundError');
const UnauthorizedError = require('../middlewares/errors/unauthorized');
const ConflictError = require('../middlewares/errors/conflictError');

const BAD_REQUEST_MSG = 'Переданы некорректные данные';
const CONFLICT_MSG = 'Email занят';
const INTERNAL_SERVER_ERROR_MSG = 'Произошла ошибка на сервере';
const NOT_FOUND_MSG = 'Пользователь не найден';
const UNAUTHORIZED_MSG = 'Ошибка авторизации';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    if (!user) {
      next(new NotFoundError(NOT_FOUND_MSG));
    } else {
      res.send(user);
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: passwordHash,
    });

    res.send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    if (e.code === 11000) {
      next(new ConflictError(CONFLICT_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (e) {
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      next(new NotFoundError(NOT_FOUND_MSG));
    } else {
      res.send(updatedUser);
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar: req.body.avatar,
      },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      next(new NotFoundError(NOT_FOUND_MSG));
    } else {
      res.send(updatedUser);
    }
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError(UNAUTHORIZED_MSG));
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        next(new UnauthorizedError(UNAUTHORIZED_MSG));
        return;
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ _id: user._id, token });
    }
  } catch (e) {
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

module.exports = {
  getUsers, getUserById, createUser, getUserInfo, updateUserInfo, updateUserAvatar, login,
};
