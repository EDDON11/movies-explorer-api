const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');
const BadReauest = require('../errors/BadReauest');
const NotFound = require('../errors/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new Conflict({
          message: 'Пользователь с таким email уже зарегистрирован',
        });
      } else next(err);
    })
    .then(() => res.send({
      message: 'Успешная регистрация',
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(() => {
      throw new Unauthorized('Авторизация не пройдена');
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { email: req.body.email, name: req.body.name },
    { runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new BadReauest('Ошибка валидации');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadReauest(`Ошибка валидации ${err}`);
      }
      if (err.name === 'MongoError' || err.code === '11000') {
        next(new Conflict('Пользователь с таким email уже зарегистрирован'));
      }
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
  login,
  createUser,
};
