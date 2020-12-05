import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import { getTxns } from '../../state/action/transactionActions';
import {
  setSuccessMessage,
  setFailMessage,
} from '../../state/reducer/messageReducer';
import { generatePDF } from '../../helpers';

const { Control, Label } = Form;

const Report = () => {
  const dispatch = useDispatch();
  const {
    transaction: { transactions },
    user: {
      user: { token },
    },
  } = useSelector((state) => state);

  const [txnDates, setTxnDates] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    dispatch(getTxns(token));
    // eslint-disable-next-line
  }, []);

  const setDetails = (e) => {
    const { name, value } = e.target;

    setTxnDates((txnDates) => ({ ...txnDates, [name]: value }));
  };

  const getReport = () => {
    const { startDate, endDate } = txnDates;

    if (!startDate && !endDate) {
      dispatch(setSuccessMessage({ message: 'Report generated' }));
      return generatePDF(transactions);
    } else if (startDate && !endDate) {
      const txnReports = transactions.filter(
        (txn) => moment(txn.tdate) >= moment(startDate)
      );
      if (txnReports.length) {
        dispatch(setSuccessMessage({ message: 'Report generated' }));
        return generatePDF(txnReports);
      }
      dispatch(setFailMessage({ message: 'No Transactions found' }));
    } else if (startDate && endDate) {
      const txnReports = transactions.filter(
        (txn) =>
          moment(txn.tdate) >= moment(startDate) &&
          moment(txn.tdate) <= moment(endDate)
      );

      if (txnReports.length) {
        dispatch(setSuccessMessage({ message: 'Report generated' }));
        return generatePDF(txnReports);
      }
      dispatch(setFailMessage({ message: 'No Transactions found' }));

      dispatch(setFailMessage({ message: 'No Transactions found' }));
    } else if (!startDate && endDate) {
      const txnReports = transactions.filter(
        (txn) => moment(txn.tdate) <= moment(endDate)
      );
      if (txnReports.length) {
        dispatch(setSuccessMessage({ message: 'Report generated' }));
        return generatePDF(txnReports);
      }
      dispatch(setFailMessage({ message: 'No Transactions found' }));
    }
    setTxnDates({ startDate: '', endDate: '' });
  };

  return (
    <div>
      <div className='container mb-4 mt-4 p-3'>
        <Row>
          <Label column sm={3}>
            Transaction start Date
          </Label>
          <Col sm={6}>
            <Control
              type='datetime-local'
              placeholder='Transaction start Date'
              name='startDate'
              value={txnDates.startDate}
              onChange={(e) => {
                setDetails(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Label column sm={3}>
            Transaction End Date
          </Label>
          <Col sm={6}>
            <Control
              type='datetime-local'
              placeholder='Transaction end Date'
              name='endDate'
              value={txnDates.endDate}
              onChange={(e) => {
                setDetails(e);
              }}
            />
          </Col>
        </Row>
        <div className='row'>
          <button className='btn btn-primary' onClick={getReport}>
            Generate report
          </button>
        </div>
      </div>
      {/* <TicketsComponent tickets={tickets} /> */}
    </div>
  );
};

export default Report;
