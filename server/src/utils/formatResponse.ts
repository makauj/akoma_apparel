export const success = (data: any, message = 'Success') => ({
  success: true,
  message,
  data,
});

export const error = (message = 'Something went wrong') => ({
  success: false,
  message,
});
