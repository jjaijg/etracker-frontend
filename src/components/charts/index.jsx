import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

import { getTxns } from '../../state/action/transactionActions';
import DisplayChart from './DisplayChart';
import { removeMessage } from '../../state/reducer/messageReducer';

const Charts = () => {
  const dispatch = useDispatch();
  const {
    user: {
      user: { token },
    },
    transaction: { transactions },
    message,
  } = useSelector((state) => state);

  const [incomes, setIncomes] = useState({});
  const [expenses, setExpenses] = useState({});
  const [chart, setChart] = useState('line');

  useEffect(() => {
    dispatch(getTxns(token));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (transactions) {
      const { incomeTxns, expenseTxns } = formatDailyTxns();
      setIncomes(incomeTxns);
      setExpenses(expenseTxns);
    }
    // eslint-disable-next-line
  }, [transactions]);

  useEffect(() => {
    if (message.message) dispatch(removeMessage());
    // eslint-disable-next-line
  }, [message.message]);

  const formatDailyTxns = () => {
    const txns = Array.from(transactions);
    // sum amount by date
    let incomeTxns = {};
    let expenseTxns = {};

    txns.forEach((txn) => {
      let tdate = moment(txn.tdate).format('DD-MM-YYYY');
      if (txn.type === 'income') {
        if (incomeTxns.hasOwnProperty(tdate)) {
          incomeTxns[tdate] += txn.amount;
        } else {
          incomeTxns[tdate] = txn.amount;
        }
      } else {
        if (expenseTxns.hasOwnProperty(tdate)) {
          expenseTxns[tdate] += txn.amount;
        } else {
          expenseTxns[tdate] = txn.amount;
        }
      }
    });
    return { incomeTxns, expenseTxns };
  };

  return (
    <div>
      <Row>
        <Col sm={2}>
          <Button onClick={() => setChart('line')}>Line Chart</Button>
        </Col>
        <Col sm={2}>
          <Button onClick={() => setChart('bar')}>Bar Chart</Button>
        </Col>
        <Col sm={2}>
          <Button onClick={() => setChart('pie')}> Pie Chart</Button>
        </Col>
      </Row>
      <Row>
        {/* {Object.entries(incomes).length ? ( */}
        <Col className='m-3'>
          <DisplayChart
            chartType={chart}
            label={'Income Chart'}
            dataSource={incomes}
          />
        </Col>
        {/* ) : (
          <h3 className='m-5'>No incomes Added!</h3>
        )} */}
        {/* {Object.entries(incomes).length ? ( */}
        <Col className='m-3'>
          <DisplayChart
            chartType={chart}
            label={'Expense Chart'}
            dataSource={expenses}
          />
        </Col>
        {/* // ) : (
        //   <h3 className='m-5 '>No expenses Added!</h3>
        // )} */}
      </Row>
    </div>
  );
};

export default Charts;
