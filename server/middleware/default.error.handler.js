export default function defultErrorHandler(req, res, next, error) {
  res.json({
    type:'fail',
    message: error.message,
  });
}

