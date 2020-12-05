import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3100/api/'
    : 'https://mtransactions.herokuapp.com/api/';

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
      if (token) REQ_HEADER.headers.Authorization = `Bearer ${token}`; //'Bearer ' + token

      return await axios({
        ...REQ_HEADER,
        url: baseUrl + url,
        ...reqParms,
      });
      // const result = res.data;
    } catch (error) {
      throw error;
    }
  };
};

export const reqToApi = makeRequestCreator();
