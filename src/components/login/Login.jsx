import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { loginUser } from '../../state/action/userActions';

const { Group, Control, Check, Label, Text } = Form;

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    dispatch(loginUser(loginDetails));
  };

  return (
    <Form>
      <Group as={Row} controlId='loginEmail'>
        <Label column sm={2}>
          Email
        </Label>
        <Col sm={6}>
          <Control
            type='text'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              console.log('email : ', e.target.value);
              setEmail(e.target.value);
            }}
          />
        </Col>
      </Group>

      <Group as={Row} controlId='loginPassword'>
        <Label column sm={2}>
          Password
        </Label>
        <Col sm={6}>
          <Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              console.log('password : ', e.target.value);
              setPassword(e.target.value);
            }}
          />
        </Col>
      </Group>

      <Button onClick={handleForm} variant='primary' type='submit'>
        Login
      </Button>
    </Form>
  );
};

export default Login;
