const User = require('../models/user');

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INTERNAL_SERVER_ERROR = 500;

module.exports = {
  findUsers(req, res) {
    User.find({})
      .then((users) => res.send({ users }))
      .catch((err) => res.status(ERROR_CODE_INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` }));
  },
  findOneUser(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res
            .status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Пользователь по указанному _id не найден.' });
        }
        return res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при создании карточки' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
  createUser(req, res) {
    const { name, about, avatar } = req.body;

    User.create({ name, about, avatar })
      .then((user) => {
        if (!user) {
          return res
            .status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Переданы некорректные данные при создании профиля.' });
        }
        return res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Пользователь с указанным _id не найден.' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
  updateUser(req, res) {
    const { name, about } = req.body;

    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res
            .status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        }
        return res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Пользователь с указанным _id не найден.' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
  updateAvatar(req, res) {
    const { avatar } = req.body;

    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res
            .status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        }
        return res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Пользователь с указанным _id не найден.' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
};
