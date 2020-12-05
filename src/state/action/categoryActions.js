import { reqToApi } from '../../api';
import { errorHandler } from '../../helpers';
import {
  setCategories,
  setSelectedCategory,
  setCategoryAdding,
  setCategoriesLoading,
} from '../reducer/categoryReducer';
import { setSuccessMessage, setFailMessage } from '../reducer/messageReducer';

// Create category
export const addCategory = (token, newCategory) => async (dispatch) => {
  try {
    dispatch(setCategoryAdding(true));

    const url = 'categories';
    let reqParms = {
      method: 'post',
      data: newCategory,
    };
    const response = await reqToApi(url, token, reqParms);
    const { message } = response.data;

    reqParms = {
      method: 'get',
    };
    const response1 = await reqToApi('categories/user', token, reqParms);
    const { data } = response1.data;

    dispatch(setCategories(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setCategoryAdding(false));
  }
};

// update category
export const updateCategory = (token, updatedCategory) => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading(true));

    const url = `categories/${updatedCategory.id}`;
    let reqParms = {
      method: 'put',
      data: updatedCategory,
    };
    const response = await reqToApi(url, token, reqParms);
    const { data: updCat, message } = response.data;

    reqParms = {
      method: 'get',
    };
    const response1 = await reqToApi('categories/user', token, reqParms);
    const { data } = response1.data;

    dispatch(setCategories(data));
    dispatch(setSelectedCategory(updCat));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setCategoriesLoading(false));
  }
};

// delete category
export const deleteCategory = (token, categoryId) => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading(true));

    const url = `categories/${categoryId}`;
    let reqParms = {
      method: 'delete',
    };
    const response = await reqToApi(url, token, reqParms);
    const { message } = response.data;

    reqParms = {
      method: 'get',
    };
    const response1 = await reqToApi('categories/user', token, reqParms);
    const { data } = response1.data;

    dispatch(setCategories(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { status, message } = errorHandler(error);
    if (status === 404) {
      dispatch(setCategories([]));
      dispatch(setSuccessMessage({ message: 'Category deleted successfully' }));
    } else {
      dispatch(setFailMessage({ message }));
    }
  } finally {
    dispatch(setCategoriesLoading(false));
  }
};

// get Categories
export const getCategories = (token, url) => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading(true));

    const reqParms = {
      method: 'get',
    };
    const response = await reqToApi(url, token, reqParms);
    const { data, message } = response.data;

    dispatch(setCategories(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setCategories([]));
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setCategoriesLoading(false));
  }
};

// get category by id
export const getCategoryById = (token, categoryId) => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading(true));

    const url = `categories/${categoryId}`;
    const reqParms = {
      method: 'get',
    };
    const response = await reqToApi(url, token, reqParms);
    const { data, message } = response.data;

    dispatch(setSelectedCategory(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setCategoriesLoading(false));
  }
};
