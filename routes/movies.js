const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/movies', getMovie);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(/^(http|https):\/\/[^ "]+$/),
      trailer: Joi.string()
        .required()
        .pattern(/^(http|https):\/\/[^ "]+$/),
      thumbnail: Joi.string()
        .required()
        .pattern(/^(http|https):\/\/[^ "]+$/),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
