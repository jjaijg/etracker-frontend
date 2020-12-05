export const errorHandler = (error) => {
  console.log('Error  : ', error);
  const errObj = { status: 500 };
  if (error.response) {
    errObj.status = error.response.status;
    errObj.message = error.response.data.message;
  } else {
    if (error.message === 'Network Error') {
      errObj.message =
        'Connection to server failed, please check your internet connection!';
    }
    errObj.message = error.message;
  }
  return errObj;
};
