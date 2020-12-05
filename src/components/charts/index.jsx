import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { getTxns } from '../../state/action/transactionActions';
import DisplayChart from './DisplayChart';
import { removeMessage } from '../../state/reducer/messageReducer';
import { splitTxns } from '../../helpers';

const { Control, Label } = Form;

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
  const [txnsByCat, setTxnsByCat] = useState({});
  const [txnsByType, setTxnsByType] = useState({});
  const [chart, setChart] = useState('line');

  useEffect(() => {
    dispatch(getTxns(token));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (transactions) {
      const { incomeTxns, expenseTxns, txnTotal, txnByCategory } = splitTxns(
        transactions
      );
      setIncomes(incomeTxns);
      setExpenses(expenseTxns);
      setTxnsByCat(txnByCategory);
      setTxnsByType(txnTotal);
    }
    // eslint-disable-next-line
  }, [transactions]);

  useEffect(() => {
    if (message.message) dispatch(removeMessage());
    // eslint-disable-next-line
  }, [message.message]);

  return (
    <Container fluid>
      <Row>
        <Col sm={10} md={6} lg={3}>
          <Label>Choose Chart Type : </Label>
          <Control
            as='select'
            value={chart}
            onChange={(e) => setChart(e.target.value)}
          >
            <option value='line'>Line</option>
            <option value='bar'>Bar</option>
            <option value='pie'>Pie</option>
          </Control>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className='m-3' sm={12} md={5} lg={5}>
          <DisplayChart
            chartType={chart}
            label={'Income Chart'}
            dataSource={incomes}
            xLabel='Transaction Dates'
            yLabel='Amount'
          />
        </Col>

        <Col className='m-3' sm={12} md={5} lg={5}>
          <DisplayChart
            chartType={chart}
            label={'Expense Chart'}
            dataSource={expenses}
            xLabel='Transaction Dates'
            yLabel='Amount'
          />
        </Col>
        <Col className='m-3' sm={12} md={5} lg={5}>
          <DisplayChart
            chartType={chart}
            label={'Transation Chart based on Category'}
            dataSource={txnsByCat}
            xLabel='Categories'
            yLabel='Amount'
          />
        </Col>
        <Col className='m-3' sm={12} md={5} lg={5}>
          <DisplayChart
            chartType={chart}
            label={'Transation Chart based on Type'}
            dataSource={txnsByType}
            xLabel='Transction Type'
            yLabel='Amount'
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Charts;
