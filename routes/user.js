const router = require('express').Router();
const {
  findUsers,
  findOneUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

router.get('/users', findUsers);

router.get('/users/:userId', findOneUser);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
