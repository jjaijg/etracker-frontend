import { reqToApi } from '../../api';
import { errorHandler } from '../../helpers';
import { setFailMessage, setSuccessMessage } from '../reducer/messageReducer';
import {
  setAuthenticating,
  setUser,
  logoutUser as logoutAction,
} from '../reducer/userReducer';

// create user
export const createUser = (newUser) => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));

    const url = 'users';
    const reqParms = {
      method: 'post',
      data: newUser,
    };
    const response = await reqToApi(url, null, reqParms);

    const { message } = response.data;
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setAuthenticating(false));
  }
};

// update user
export const updateUser = (userToken, updUser) => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));

    const url = 'users';
    const reqParms = {
      method: 'put',
      data: updUser,
    };
    const response = await reqToApi(url, userToken, reqParms);
    const { data, token, message } = response.data;
    localStorage.setItem('user', JSON.stringify({ ...data, token }));
    dispatch(setUser({ ...data, token }));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setAuthenticating(false));
  }
};

// update user password
export const updateUserPass = (userToken, passObj) => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));

    const url = 'users/changepassword';
    const reqParms = {
      method: 'put',
      data: passObj,
    };
    const response = await reqToApi(url, userToken, reqParms);
    const { message } = response.data;

    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setAuthenticating(false));
  }
};

// authenticate user
export const loginUser = (userDetails) => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));

    const url = 'users/login';
    const reqParms = {
      method: 'post',
      data: userDetails,
    };
    const response = await reqToApi(url, null, reqParms);
    const { data, token, message } = response.data;
    localStorage.setItem('user', JSON.stringify({ ...data, token }));
    dispatch(setUser({ ...data, token }));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setAuthenticating(false));
  }
};

// get user profile
export const getUserDetails = (token) => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));

    const url = 'users/profile';
    const reqParms = {
      method: 'get',
    };
    await reqToApi(url, token, reqParms);
  } catch (error) {
    // const { message } = errorHandler(error);
    localStorage.removeItem('user');
    dispatch(setUser(null));
    // dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setAuthenticating(false));
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));
    dispatch(logoutAction());
  } catch (error) {
    console.log('Error in logout : ', error);
  } finally {
    dispatch(setAuthenticating(false));
  }
};
