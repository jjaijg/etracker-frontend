import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import TableData from './TableData';
import TableHeader from './TableHeader';
import { getExpenses } from '../../state/action/expenseActions';

const ExpenseTable = (props) => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);
  const { token } = useSelector((state) => state.user);

  const [sorting, setSorting] = useState({ field: '', order: '' });

  const header = [
    { name: '#', field: 'id', sortable: false },
    { name: 'Purpose', field: 'purpose', sortable: true },
    { name: 'Amount', field: 'amt', sortable: true },
    { name: 'Date', field: 'expdate', sortable: false },
    { name: 'Type', field: 'expensetype', sortable: false },
  ];

  useEffect(() => {
    dispatch(getExpenses(token));
  }, [token]);

  return (
    <Table striped bordered hover responsive>
      <TableHeader
        header={header}
        onSorting={(field, order) => {
          setSorting({ field, order });
        }}
      />
      <TableData expenses={expenses} />
    </Table>
  );
};

export default ExpenseTable;
