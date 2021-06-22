const router = require('express').Router();
const { findUsers, findOneUser, createUser, updateUser, updateAvatar } = require('../controllers/user');

router.get('/users', findUsers);

router.get('/users/:_id', findOneUser);

router.post('/users', createUser);

router.patch('/users/me/:_id', updateUser);

router.patch('/users/me/avatar/:_id', updateAvatar);

module.exports = router;