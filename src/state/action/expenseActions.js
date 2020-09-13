import { reqToApi } from '../../api';
import {
  setExpensess,
  setExpensesStatus,
  setExpensesLoading,
} from '../reducer/expenseReducer';

// get Expenses
export const getExpenses = (token) => async (dispatch) => {
  try {
    dispatch(setExpensesLoading(true));

    const url = 'expenses';
    const reqParms = {
      method: 'get',
    };
    const response = await reqToApi(url, token, reqParms);

    if (response.data.success) {
      const { data } = response.data;
      dispatch(setExpensess(data));
    } else {
      console.log('error : ', response);
    }
    const { success, message } = response.data;
    dispatch(setExpensesStatus({ success, message }));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setExpensesLoading(false));
  }
};
