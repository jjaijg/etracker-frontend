import { reqToApi } from '../../api';
import {
  setAuthenticating,
  setToken,
  setUser,
  setAuthenticationStatus,
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

    if (!response.data.success) {
      console.log('error : ', response);
    }

    const { success, message } = response.data;
    dispatch(setAuthenticationStatus({ success, message }));
  } catch (error) {
    console.log(error);
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
    console.log('response : ', response);
    if (response.data.success) {
      console.log(response);
      const { user, token } = response.data;
      console.log('user : ', response.data);
      dispatch(setUser({ user, token }));
    } else {
      console.log('error : ', response);
    }

    const { success, message } = response.data;
    dispatch(setAuthenticationStatus({ success, message }));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setAuthenticating(false));
  }
};

// get user
export const getUserDetails = (token) => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));

    const url = 'users/profile';
    const reqParms = {
      method: 'get',
    };
    const response = await reqToApi(url, token, reqParms);

    if (!response.error) {
      console.log(response);
    } else {
      console.log('error : ', response);
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setAuthenticating(false));
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(setAuthenticating(true));
    dispatch(setToken(null));
    dispatch(setUser(null));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setAuthenticating(false));
  }
};
