const User = require('../models/user');

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INTERNAL_SERVER_ERROR = 500;

module.exports = {
  findUsers(req, res) {
    User.find({})
      .then((users) => res.send({ users }))
      .catch(err => res.status(ERROR_CODE_INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка' }));
  },
  findOneUser(req, res) {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          return res.status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Пользователь по указанному _id не найден.' });
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res.status(ERROR_CODE_NOT_FOUND)
            .send({ message: "Переданы некорректные данные при создании карточки" });
        }
        return res.status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла ошибка' });
      });
  },
  createUser(req, res) {
    const { name, about, avatar } = req.body;

    User.create({ name, about, avatar })
      .then((user) => {
        if (!user) {
          return res.status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при создании профиля.' });
        }
        res.send({ user });
      })
      .catch(err => res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
  },
  updateUser(req, res) {
    const { name, about } = req.body;

    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res.status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return res.status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Пользователь с указанным _id не найден.' });
        }
        return res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      });
  },
  updateAvatar(req, res) {
    const { avatar } = req.body;

    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res.status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Пользователь с указанным _id не найден.' });
        }
        return res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      });
  },
};