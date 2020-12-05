import { reqToApi } from '../../api';
import { errorHandler } from '../../helpers';
import { setFailMessage, setSuccessMessage } from '../reducer/messageReducer';
import {
  setTransactions,
  setSelectedTransaction,
  setTransactionAdding,
  setTransactionLoading,
} from '../reducer/transactionReducer';

// Create transaction
export const addTxn = (token, newTxn) => async (dispatch) => {
  try {
    dispatch(setTransactionAdding(true));

    const url = 'transactions';
    let reqParms = {
      method: 'post',
      data: newTxn,
    };
    const response = await reqToApi(url, token, reqParms);
    const { message } = response.data;

    reqParms = {
      method: 'get',
    };
    const response1 = await reqToApi(url, token, reqParms);
    const { data } = response1.data;

    dispatch(setTransactions(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setTransactionAdding(false));
  }
};

// update transaction
export const updateTxn = (token, updatedTxn) => async (dispatch) => {
  try {
    dispatch(setTransactionLoading(true));

    const url = `transactions/${updatedTxn.id}`;
    let reqParms = {
      method: 'put',
      data: updatedTxn,
    };
    const response = await reqToApi(url, token, reqParms);

    const { data: updTxn, message } = response.data;

    reqParms = {
      method: 'get',
    };
    const response1 = await reqToApi(url, token, reqParms);
    const { data } = response1.data;

    dispatch(setTransactions(data));
    dispatch(setSelectedTransaction(updTxn));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setTransactionLoading(false));
  }
};

// delete transaction
export const deleteTxn = (token, txnId) => async (dispatch) => {
  try {
    dispatch(setTransactionLoading(true));

    const url = `transactions/${txnId}`;
    let reqParms = {
      method: 'delete',
    };
    const response = await reqToApi(url, token, reqParms);
    const { message } = response.data;

    reqParms = {
      method: 'get',
    };
    const response1 = await reqToApi('transactions', token, reqParms);
    const { data } = response1.data;

    dispatch(setTransactions(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { status, message } = errorHandler(error);
    if (status === 404) {
      dispatch(setTransactions([]));
      dispatch(
        setSuccessMessage({ message: 'Transaction deleted successfully' })
      );
    } else {
      dispatch(setFailMessage({ message }));
    }
  } finally {
    dispatch(setTransactionLoading(false));
  }
};

// get transactions
export const getTxns = (token) => async (dispatch) => {
  try {
    dispatch(setTransactionLoading(true));

    const url = 'transactions';
    const reqParms = {
      method: 'get',
    };
    const response = await reqToApi(url, token, reqParms);
    const { data, message } = response.data;

    dispatch(setTransactions(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setTransactionLoading(false));
  }
};

// get transaction by id
export const getTxnById = (token, txnId) => async (dispatch) => {
  try {
    dispatch(setTransactionLoading(true));

    const url = `transactions/${txnId}`;
    const reqParms = {
      method: 'get',
    };
    const response = await reqToApi(url, token, reqParms);
    const { data, message } = response.data;

    dispatch(setSelectedTransaction(data));
    dispatch(setSuccessMessage({ message }));
  } catch (error) {
    const { message } = errorHandler(error);
    dispatch(setFailMessage({ message }));
  } finally {
    dispatch(setTransactionLoading(false));
  }
};
