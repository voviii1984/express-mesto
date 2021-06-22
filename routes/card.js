const router = require('express').Router();
const {
  findCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/card');

router.get('/cards', findCards);

router.post('/cards', createCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

router.delete('/cards/:cardId', deleteCard);

module.exports = router;
