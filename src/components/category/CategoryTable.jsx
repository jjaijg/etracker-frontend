import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import TableData from './TableData';
import TableHeader from './TableHeader';
import TableAction from './TableAction';
import {
  getCategories,
  deleteCategory as deleteCatAction,
} from '../../state/action/categoryActions';
import Loader from '../loader';

const CategoryTable = (props) => {
  const dispatch = useDispatch();
  const { categories, categoriesLoading } = useSelector(
    (state) => state.category
  );
  const {
    user: { token },
  } = useSelector((state) => state.user);

  // eslint-disable-next-line
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const header = [
    { name: '#', field: 'id', sortable: false, render: (rec, ind) => ind + 1 },
    { name: 'Category', field: 'name', sortable: true },
    { name: 'Action', field: 'action' },
  ];

  useEffect(() => {
    dispatch(getCategories(token, 'categories/user'));
    // eslint-disable-next-line
  }, []);

  const deleteCategory = (id) => {
    dispatch(deleteCatAction(token, id));
  };

  const tableHeader = header.map((col, ind) => {
    if (col.field !== 'action') return col;
    return {
      ...col,
      render: (rec, ind) => {
        //  ('cat tab : ', rec, ind);
        return (
          <TableAction
            row={rec}
            id={rec.id}
            rowInd={ind}
            onDelete={deleteCategory}
          />
        );
      },
    };
  });

  return (
    <>
      <Loader isLoading={categoriesLoading} />

      <Table striped bordered hover responsive>
        <TableHeader
          header={tableHeader}
          onSorting={(field, order) => {
            setSorting({ field, order });
          }}
        />
        <TableData dataSource={categories} header={tableHeader} />
      </Table>
    </>
  );
};

export default CategoryTable;
