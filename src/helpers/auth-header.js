import serverConfig from '../config/server.config';

export const authHeader = () => {
  const reqTimeOut = {
    timeout: serverConfig.TIME_OUT,
    timeoutErrorMessage: serverConfig.TIME_OUT_MESSAGE,
  };
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {
      ...reqTimeOut,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };
  } else {
    return { ...reqTimeOut };
  }
};
