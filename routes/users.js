const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/users/me', getUser);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser,
);

module.exports = router;
