import React from 'react';

import { Card } from 'react-bootstrap';
import './ExpenseCard.css';

const { Text, Body, Title } = Card;

const ExpenseCard = (props) => {
  return (
    <Card className='expense-card mx-auto'>
      <Body>
        <Title className='text-center display-5'>{props.title}</Title>
        <div
          className='rounded-circle m-auto expense-card-amount'
          style={{ borderColor: props.color }}
        >
          <Text className='expense-card-text'>{props.amount}</Text>
        </div>
      </Body>
    </Card>
  );
};

export default ExpenseCard;
