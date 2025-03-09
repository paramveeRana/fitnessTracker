// eslint-disable-next-line import/prefer-default-export
export const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

export const handleError = (err, req, res, next) => {
  console.error('Error details:', {
    status: err.status || 500,
    message: err.message,
    path: req.path,
    method: req.method,
    body: req.body,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
    timestamp: new Date().toISOString()
  });
};
