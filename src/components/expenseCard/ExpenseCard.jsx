import React from 'react';
import CountUp from 'react-countup';

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
          <Text className='expense-card-text'>
            <CountUp
              start={0}
              end={props.amount}
              duration={2}
              separator=' '
              decimals={2}
              decimal='.'
              prefix='₹ '
            />
          </Text>
        </div>
      </Body>
    </Card>
  );
};

export default ExpenseCard;
