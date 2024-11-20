// Defult error handler
export default function defaultErrorHandler(err, req, res, next) {
  if (err.name === "CastError") {
    err.message = `Invalid formate of ${err.path}`;
    err.statusCode = 404;
  }
  if (err.code === 11000) {
    err.message = `Duplicate field -  ${Object.keys(err.keyPattern).join(
      ", "
    )}`;
    err.statusCode = 400;
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong, please try again later",
  });
}
