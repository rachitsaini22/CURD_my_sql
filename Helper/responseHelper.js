// Send success response
export const sendSuccess = (res, message, data = null) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

// Send error response
export const sendError = (res, message, status = 500) => {
  res.status(status).json({
    success: false,
    message,
  });
};
