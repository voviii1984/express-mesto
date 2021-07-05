const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/card');

router.get('/cards', findCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^((http|https)?:\/\/)(w{3}\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)?\/?#?/),
  }),
}), createCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

router.delete('/cards/:cardId', deleteCard);

module.exports = router;
