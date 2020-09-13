import React from 'react';
import ExpenseCard from '../expenseCard';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = (props) => {
  return (
    <Container fluid>
      <h2>Dashboard</h2>
      <Row>
        <Col className='col-12 my-3'>
          <h3>Income Overview</h3>
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FFC300'}
            title={"Today's Income"}
            amount={10000}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FF5733'}
            title={'This week Income'}
            amount={500}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#C70039'}
            title={'This month Income'}
            amount={9000}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#EE1212'}
            title={'This Year Income'}
            amount={1900000}
          />
        </Col>
      </Row>
      <Row>
        <Col className='col-12 my-3'>
          <h3>Expense Overview</h3>
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FFC300'}
            title={"Today's Expense"}
            amount={10000}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#FF5733'}
            title={'This week Expense'}
            amount={500}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#C70039'}
            title={'This month Expense'}
            amount={9000}
          />
        </Col>
        <Col sm={6} md={4} lg={3} className=' mb-3'>
          <ExpenseCard
            color={'#EE1212'}
            title={'This Year Expense'}
            amount={1900000}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
