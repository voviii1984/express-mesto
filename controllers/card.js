const Card = require('../models/card');

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INTERNAL_SERVER_ERROR = 500;

module.exports = {
  findCards(req, res) {
    Card.find({})
      .then((cards) => res.send({ cards }))
      .catch((err) => res.status(ERROR_CODE_INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` }));
  },
  createCard(req, res) {
    // console.log(req.user._id);
    const owner = req.user._id;
    const { name, link } = req.body;

    Card.create({ name, link, owner })
      .then((card) => {
        if (!card) {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при создании карточки.' });
        }
        return res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные при создании карточки' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
  likeCard(req, res) {
    Card.findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true })
      .then((card) => {
        if (!card) {
          return res
            .status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Переданы некорректные данные для постановки лайка.' });
        }
        return res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные карточки' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
  dislikeCard(req, res) {
    Card.findByIdAndUpdate(req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true })
      .then((card) => {
        if (!card) {
          return res
            .status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Переданы некорректные данные для снятии лайка.' });
        }
        return res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные карточки' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
  deleteCard(req, res) {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (!card) {
          return res
            .status(ERROR_CODE_NOT_FOUND)
            .send({ message: 'Карточка с указанным _id не найдена.' });
        }
        return res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          return res
            .status(ERROR_CODE_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные карточки' });
        }
        return res
          .status(ERROR_CODE_INTERNAL_SERVER_ERROR)
          .send({ message: `Произошла ошибка: ${err.message}` });
      });
  },
};
