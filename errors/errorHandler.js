const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  res
    .status(status)
    .send(
      status === 500 ? { message: 'На сервере произошла ошибка' } : { message },
    );
  next();
};

module.exports = errorHandler;
