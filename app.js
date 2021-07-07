const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const rateLimit = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errors/errorHandler');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(rateLimit);
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.listen(PORT);
