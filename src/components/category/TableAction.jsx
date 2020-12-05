import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const TableAction = ({ row, id, rowId, onDelete }) => {
  const history = useHistory();

  const linkToUrl = () => {
    history.push(`/categories/${id}`);
  };

  return (
    <Row>
      <Col>
        <Button variant='primary' onClick={linkToUrl}>
          Edit
        </Button>
      </Col>
      <Col>
        <Button variant='danger' onClick={() => onDelete(id)}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};

export default TableAction;
