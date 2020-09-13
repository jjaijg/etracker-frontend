import axios from 'axios';

const baseUrl = 'http://localhost:3100/api/';

const REQ_HEADER = {
  timeout: 15000,
  timeoutErrorMessage: 'Oops!!! check your internet connection!',
  headers: {
    'Content-Type': 'application/json',
  },
};

const makeRequestCreator = () => {
  return async (url, token, reqParms) => {
    try {
      console.log('REQ PARMS :', reqParms);
      if (token) REQ_HEADER.headers.Authorization = `Bearer ${token}`; //'Bearer ' + token

      return await axios({
        ...REQ_HEADER,
        url: baseUrl + url,
        ...reqParms,
      });
      // const result = res.data;
    } catch (error) {
      console.log('Something went wrong: ', error.message);
      return _throwError(error);
    }
  };
};

const _throwError = (error) => {
  return {
    error: true,
    message: error.message,
    status: error.status,
  };
};

export const reqToApi = makeRequestCreator();
