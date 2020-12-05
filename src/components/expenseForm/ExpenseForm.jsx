//type,amount,tdate
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Form, Button, Row, Col } from 'react-bootstrap';

import Loader from '../loader';

import {
  addTxn,
  getTxnById,
  updateTxn,
} from '../../state/action/transactionActions';
import { getCategories } from '../../state/action/categoryActions';
import { useParams } from 'react-router-dom';
const { Group, Control, Label } = Form;

const Expense = () => {
  const dispatch = useDispatch();
  const {
    user: {
      user: { token },
    },
    category: { categories },
    transaction: { selectedTransaction, transactionLoading, transactionAdding },
  } = useSelector((state) => state);
  const { txnId } = useParams();

  const [submitted, setSubmitted] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({
    amount: '',
    type: '',
    description: '',
    tdate: '',
    cid: '',
  });

  useEffect(() => {
    dispatch(getCategories(token, 'categories'));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (txnId) dispatch(getTxnById(token, txnId));
    // eslint-disable-next-line
  }, [txnId]);
  useEffect(() => {
    if (selectedTransaction) {
      const { amount, id, description, tdate, cid, type } = selectedTransaction;
      setExpenseDetails({
        amount,
        id,
        description,
        tdate: moment(tdate).format('YYYY-MM-DDTHH:MM:SS'),
        cid,
        type,
      });
    }
    // eslint-disable-next-line
  }, [selectedTransaction]);

  const setDetails = (e) => {
    let { name, value } = e.target;
    if (name === 'amount') value = parseFloat(value) || 0;
    setExpenseDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newExpense = {
      ...expenseDetails,
    };
    const { amount, description, tdate, cid, type } = expenseDetails;
    if (
      amount &&
      description &&
      tdate &&
      cid &&
      type &&
      moment.now() >= moment(tdate)
    ) {
      if (txnId) {
        dispatch(updateTxn(token, { id: txnId, ...newExpense }));
      } else {
        dispatch(addTxn(token, newExpense));
      }
    }
  };

  return (
    <div className='expense-form'>
      <Loader isLoading={transactionLoading || transactionAdding} />

      <h3 className='expense-form-header'>
        {txnId ? 'Edit' : 'Add'} Transaction
      </h3>

      <Form>
        <Group as={Row} controlId='expenseAmount'>
          <Label column sm={2}>
            Transaction Amount
          </Label>
          <Col sm={6}>
            <Control
              type='number'
              name='amount'
              placeholder='Expense Amount'
              value={expenseDetails.amount}
              onChange={(e) => {
                setDetails(e);
              }}
            />
            {submitted && !expenseDetails.amount && (
              <span className='invalid-feedback'>Amount is required</span>
            )}
          </Col>
        </Group>

        <Group as={Row} controlId='type'>
          <Label column sm={2}>
            Transaction Type
          </Label>
          <Col sm={6}>
            <Control
              as='select'
              placeholder='Expense type'
              name='type'
              value={expenseDetails.type}
              onChange={(e) => {
                setDetails(e);
              }}
            >
              <option value='' defaultChecked disabled>
                ---Select Transaction type---
              </option>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </Control>
            {submitted && !expenseDetails.type && (
              <span className='invalid-feedback'>Type is required</span>
            )}
          </Col>
        </Group>

        <Group as={Row} controlId='expenseCategory'>
          <Label column sm={2}>
            Category
          </Label>
          <Col sm={6}>
            <Control
              as='select'
              placeholder='Expense Category'
              name='cid'
              value={expenseDetails.cid}
              onChange={(e) => {
                setDetails(e);
              }}
            >
              <option value='' defaultChecked disabled>
                ---Select a Category---
              </option>
              {categories?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Control>
            {submitted && !expenseDetails.cid && (
              <span className='invalid-feedback'>category is required</span>
            )}
          </Col>
        </Group>

        <Group as={Row} controlId='expensedescription'>
          <Label column sm={2}>
            Description
          </Label>
          <Col sm={6}>
            <Control
              type='text'
              placeholder='Expense description'
              name='description'
              value={expenseDetails.description}
              onChange={(e) => {
                setDetails(e);
              }}
            />
            {submitted && !expenseDetails.description && (
              <span className='invalid-feedback'>Description is required</span>
            )}
          </Col>
        </Group>

        <Group as={Row} controlId='expenseDate'>
          <Label column sm={2}>
            Transaction Date
          </Label>
          <Col sm={6}>
            <Control
              type='datetime-local'
              placeholder='Transaction Date'
              name='tdate'
              value={expenseDetails.tdate}
              onChange={(e) => {
                setDetails(e);
              }}
            />
            {submitted && !expenseDetails.tdate && (
              <span className='invalid-feedback'>
                Trasnaction date is required
              </span>
            )}
            {submitted && moment.now() < moment(expenseDetails.tdate) && (
              <span className='invalid-feedback'>
                Trasnaction date should not be future date
              </span>
            )}
          </Col>
        </Group>

        <Button
          onClick={handleForm}
          variant='primary'
          type='submit'
          block
          disabled={transactionLoading || transactionAdding}
        >
          {txnId ? 'Update' : 'Add'} Transaction
        </Button>
      </Form>
    </div>
  );
};
export default Expense;
