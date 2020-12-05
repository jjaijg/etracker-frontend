import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { loginUser, logoutUser } from '../../state/action/userActions';

import './Login.css';
import { Link } from 'react-router-dom';
import Loader from '../loader';

const { Group, Control, Label } = Form;

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const {
    user: { user, authenticating },
    message,
  } = useSelector((state) => state);

  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      dispatch(logoutUser());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (message.type === 'alert-success') {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [message.type]);

  const handleForm = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const loginDetails = {
      email,
      password,
    };

    if (email && password) dispatch(loginUser(loginDetails));
  };

  return (
    <div className='container login'>
      <h3 className='text-center login-header'>Login</h3>
      <Form>
        <Group as={Row} controlId='loginEmail'>
          <Label column sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Control
              type='text'
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {submitted && !email && (
              <span className='invalid-feedback'>Email is required</span>
            )}
          </Col>
        </Group>

        <Group as={Row} controlId='loginPassword'>
          <Label column sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {submitted && !password && (
              <span className='invalid-feedback'>Password is required</span>
            )}
          </Col>
        </Group>

        <Row className='mt-5'>
          <Col md={{ span: 6, offset: 2 }} className='mb-2'>
            <Button
              onClick={handleForm}
              variant='success'
              type='submit'
              block
              disabled={authenticating}
            >
              {authenticating ? 'Logging in' : 'Login'}
            </Button>
          </Col>
          <Col>
            <Link to='/register'>New User? Register here</Link>
          </Col>
        </Row>
      </Form>
      <Loader isLoading={authenticating} />
    </div>
  );
};

export default Login;
