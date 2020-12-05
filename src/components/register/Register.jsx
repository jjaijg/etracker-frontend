import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { createUser, logoutUser } from '../../state/action/userActions';
import './Register.css';
import { Link } from 'react-router-dom';
import Loader from '../loader';

const { Group, Control, Label } = Form;

const Register = ({ history }) => {
  const dispatch = useDispatch();

  const {
    user: { authenticating },
    message,
  } = useSelector((state) => state);

  const [submitted, setSubmitted] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(logoutUser());
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (message.type === 'alert-success') {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, [message.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((profile) => ({ ...profile, [name]: value }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    // validate fields
    // format data

    // call api to register user
    setSubmitted(true);
    if (profile.username && profile.email && profile.phone && profile.password)
      dispatch(createUser(profile));
  };

  return (
    <div className='container register'>
      <h3 className='text-center register-header'>Signup</h3>
      <Form onSubmit={handleForm}>
        <Group as={Row} controlId='registerUsername'>
          <Label column sm={2}>
            Username
          </Label>
          <Col sm={10}>
            <Control
              type='text'
              name='username'
              placeholder='Enter Username'
              value={profile.username}
              onChange={handleChange}
            />
            {submitted && !profile.username && (
              <span className='invalid-feedback'>Username is required</span>
            )}
          </Col>
        </Group>
        <Group as={Row} controlId='registerEmail'>
          <Label column sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={profile.email}
              onChange={handleChange}
            />
            {submitted && !profile.email && (
              <span className='invalid-feedback'>Email is required</span>
            )}
          </Col>
        </Group>
        <Group as={Row} controlId='registerPhone'>
          <Label column sm={2}>
            Phone
          </Label>
          <Col sm={10}>
            <Control
              type='tel'
              name='phone'
              placeholder='Enter phone number'
              value={profile.phone}
              onChange={handleChange}
            />
            {submitted && !profile.phone && (
              <span className='invalid-feedback'>Phone is required</span>
            )}
          </Col>
        </Group>

        <Group as={Row} controlId='registerPassword'>
          <Label column sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Control
              type='password'
              name='password'
              placeholder='Password'
              value={profile.password}
              onChange={handleChange}
            />
            {submitted && !profile.password && (
              <span className='invalid-feedback'>Password is required</span>
            )}
          </Col>
        </Group>

        <Row className='mt-5'>
          <Col md={{ span: 6, offset: 2 }} className='mb-2'>
            <Button
              variant='success'
              type='submit'
              block
              disabled={authenticating}
            >
              {authenticating ? 'Registering' : 'Register'}
            </Button>
          </Col>
          <Col>
            <Link to='/login'>Already Registered? Login here</Link>
          </Col>
        </Row>
      </Form>
      <Loader isLoading={authenticating} />
    </div>
  );
};

export default Register;
