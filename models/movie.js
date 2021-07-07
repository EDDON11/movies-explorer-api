const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },

  director: {
    type: String,
    require: true,
  },

  duration: {
    type: Number,
    require: true,
  },

  year: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    require: true,

    validator(valid) {
      return /(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/.test(
        valid,
      );
    },
    message: 'Введите правильный url',
  },

  trailer: {
    type: String,
    require: true,
    validator(valid) {
      return /(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/.test(
        valid,
      );
    },
    message: 'Введите правильный url',
  },

  thumbnail: {
    type: String,
    require: true,
    validator(valid) {
      return /(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/.test(
        valid,
      );
    },
    message: 'Введите правильный url',
  },

  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
    unique: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
