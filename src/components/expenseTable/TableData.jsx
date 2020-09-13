import React from 'react';

const TableData = ({ expenses }) => {
  return (
    <tbody>
      {expenses.length ? (
        expenses.map((exp, ind) => {
          const { eid, purpose, amt, expdate, expensetype } = exp;
          return (
            <tr key={eid}>
              <td>{ind + 1}</td>
              <td>{purpose}</td>
              <td>{amt}</td>
              <td>{expdate}</td>
              <td>{expensetype}</td>
            </tr>
          );
        })
      ) : (
        <h3>No Expenses</h3>
      )}
    </tbody>
  );
};

export default TableData;
