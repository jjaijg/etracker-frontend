import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableHeader = ({ header, onSorting }) => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const onSortingChange = (field) => {
    const order =
      field === sortField && sortOrder === ''
        ? 'asc'
        : sortOrder === 'asc'
        ? 'desc'
        : '';
    /*
    empty -asc
    asc - desc
    desc- empy
    */
    setSortField(field);
    setSortOrder(order);
    console.log('Filed sort : ', field, order);
    onSorting(field, order);
  };

  const getArrows = (order) => {
    let icons = [];
    if (order === 'asc') {
      icons.push('arrow-down');
    } else if (order === 'desc') {
      icons.push('arrow-up');
    } else {
      icons.push('arrow-up', 'arrow-down');
    }
    const ArrowComponent = (
      <>
        {icons.map((icon) => (
          <FontAwesomeIcon icon={icon} size='xs' />
        ))}
      </>
    );
    return ArrowComponent;
  };

  return (
    <thead>
      <tr>
        {header.map(({ field, name, sortable }) => {
          return (
            <th
              key={field}
              onClick={() => {
                console.log('soring', sortable);
                return sortable ? onSortingChange(field) : null;
              }}
            >
              <Row>
                <Col>{name}</Col>
                <Col className='text-right'>
                  {sortable && getArrows(sortOrder)}
                </Col>
              </Row>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {};

export default TableHeader;
