export default function customErrorHandler(res, message, statusCode) {
  res.status(statusCode).json({
    type: "fail",
    message,
  });
}
