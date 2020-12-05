import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import ExpenseCard from '../expenseCard';

import { getTxns } from '../../state/action/transactionActions';
import { removeMessage } from '../../state/reducer/messageReducer';
import { checkDate } from '../../helpers';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const {
    user: {
      user: { token },
    },
    transaction: { transactions },
    message,
  } = useSelector((state) => state);

  const [incomes, setIncomes] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  });
  const [expenses, setExpenses] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  useEffect(() => {
    dispatch(getTxns(token));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (transactions) {
      const { income, expense } = parseTxns();
      setIncomes(income);
      setExpenses(expense);
    }
    // eslint-disable-next-line
  }, [transactions]);

  const parseTxns = () => {
    const txns = Array.from(transactions);

    const txnData = {
      income: { today: 0, week: 0, month: 0, year: 0 },
      expense: { today: 0, week: 0, month: 0, year: 0 },
    };

    txns.forEach((txn) => {
      const { isToday, isWeek, isMonth, isYear } = checkDate(txn.tdate);
      if (isToday) txnData[txn.type]['today'] += txn.amount;
      if (isWeek) txnData[txn.type]['week'] += txn.amount;
      if (isMonth) txnData[txn.type]['month'] += txn.amount;
      if (isYear) txnData[txn.type]['year'] += txn.amount;
    });
    return txnData;
  };

  useEffect(() => {
    if (message.message) dispatch(removeMessage());
    // eslint-disable-next-line
  }, [message.message]);

  return (
    <Container fluid>
      <h2>Dashboard</h2>
      <Row>
        <Col className='col-12 my-3'>
          <h3>Income Overview</h3>
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FFC300'}
            title={"Today's Income"}
            amount={incomes.today}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FF5733'}
            title={'This week Income'}
            amount={incomes.week}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#C70039'}
            title={'This month Income'}
            amount={incomes.month}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#EE1212'}
            title={'This Year Income'}
            amount={incomes.year}
          />
        </Col>
      </Row>
      <Row>
        <Col className='col-12 my-3'>
          <h3>Expense Overview</h3>
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FFC300'}
            title={"Today's Expense"}
            amount={expenses.today}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FF5733'}
            title={'This week Expense'}
            amount={expenses.week}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#C70039'}
            title={'This month Expense'}
            amount={expenses.month}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#EE1212'}
            title={'This Year Expense'}
            amount={expenses.year}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
