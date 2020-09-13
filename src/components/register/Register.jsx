import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { createUser } from '../../state/action/userActions';

const { Group, Control, Check, Label, Text } = Form;

const Register = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    // validate fields
    // format data
    const newUser = {
      firstName,
      lastName,
      email,
      number: phone,
      gender,
      password,
    };
    // call api to register user
    dispatch(createUser(newUser));
  };

  return (
    <Form>
      <Group as={Row} controlId='registerFirstName'>
        <Label column sm={2}>
          First Name
        </Label>
        <Col sm={6}>
          <Control
            type='text'
            placeholder='Enter first name'
            value={firstName}
            onChange={(e) => {
              console.log('first name : ', e.target.value);
              setFirstName(e.target.value);
            }}
          />
        </Col>
      </Group>
      <Group as={Row} controlId='registerLastName'>
        <Label column sm={2}>
          Last Name
        </Label>
        <Col sm={6}>
          <Control
            type='text'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => {
              console.log('last name : ', e.target.value);
              setLastName(e.target.value);
            }}
          />
        </Col>
      </Group>
      <Group as={Row} controlId='registerEmail'>
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
      <Group as={Row} controlId='registerNumber'>
        <Label column sm={2}>
          Phone
        </Label>
        <Col sm={6}>
          <Control
            type='text'
            placeholder='Enter phone number'
            value={phone}
            onChange={(e) => {
              console.log('Phome : ', e.target.value);
              setPhone(e.target.value);
            }}
          />
        </Col>
      </Group>
      <Group as={Row} controlId='registerGender'>
        <Label as='legend' column sm={2}>
          Gender
        </Label>
        <Col sm={6}>
          <Check
            type='radio'
            label='Male'
            name='gender'
            id='male'
            value='male'
            checked={gender === 'male'}
            onChange={(e) => {
              console.log('gender : ', e.target.value);

              setGender(e.target.value);
            }}
          />
          <Check
            type='radio'
            label='Female'
            name='gender'
            id='female'
            value='female'
            checked={gender === 'female'}
            onChange={(e) => {
              console.log('gender : ', e.target.value);
              setGender(e.target.value);
            }}
          />
        </Col>
      </Group>
      <Group as={Row} controlId='registerPassword'>
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
        Register
      </Button>
    </Form>
  );
};

export default Register;
