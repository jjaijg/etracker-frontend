import React from 'react';

const TableData = ({ header, dataSource }) => {
  return (
    <tbody>
      {dataSource.length ? (
        dataSource.map((category, ind) => {
          return (
            <tr key={ind}>
              {header.map((col) => {
                if (col.render) {
                  return <td key={col.field}>{col.render(category, ind)}</td>;
                }
                return <td key={col.field}>{category[col.field]}</td>;
              })}
            </tr>
          );
        })
      ) : (
        <tr>
          <td>
            <h3>No Categories created yet!!!</h3>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableData;
