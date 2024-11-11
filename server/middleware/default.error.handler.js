// Defult error handler
export default function defaultErrorHandler (err, req, res, next) {
    res.status(err.statusCode || 500).json({
      success:false,
      message: err.message || "Something went wrong, please try again later",
    });
}