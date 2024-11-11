export const TryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default function customErrorHandler(res, message, statusCode) {
  res.status(statusCode).json({
    success: false,
    message,
  });
}
