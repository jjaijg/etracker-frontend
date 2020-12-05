import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';
import { updateUser, updateUserPass } from '../../state/action/userActions';
import Loader from '../loader';
import {
  removeMessage,
  setFailMessage,
} from '../../state/reducer/messageReducer';

const { Control } = Form;

const Profile = () => {
  const dispatch = useDispatch();
  const { user, authenticating } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    isUsernameEdit: false,
    isPhoneEdit: false,
  });
  const [passObj, setPassObj] = useState({ password: '', oldPassword: '' });
  const [isPassChange, setIsPassChange] = useState(false);

  // useEffect(() => {
  //   setProfile((prof) => ({
  //     ...prof,
  //     username: user.username,
  //     email: user.email,
  //     phone: user.phone,
  //   }));
  // }, []);

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassObj((prePass) => ({ ...prePass, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prof) => ({ ...prof, [name]: value }));
  };
  const handleProfileUpdate = (e) => {
    if (!profile.username || !profile.phone) {
      dispatch(setFailMessage({ message: "Fields can't be empty" }));
      return;
    }
    if (user.phone !== profile.phone || user.username !== profile.username) {
      dispatch(removeMessage());
      dispatch(
        updateUser(user.token, {
          username: profile.username,
          phone: profile.phone,
        })
      );
    }
    setProfile((prof) => ({
      ...prof,
      isPhoneEdit: false,
      isUsernameEdit: false,
    }));
  };

  const handlePassUpdate = () => {
    if (!passObj.password || !passObj.oldPassword) {
      dispatch(
        setFailMessage({ message: 'Please fill all the password fields!' })
      );
      return;
    }
    if (passObj.password === passObj.oldPassword) {
      dispatch(setFailMessage({ message: 'Old and New passwords are same' }));
      return;
    }
    dispatch(removeMessage());
    dispatch(updateUserPass(user.token, passObj));
    handleCancel();
  };

  const handleCancel = () => {
    setIsPassChange(false);
    setPassObj({ oldPassword: '', password: '' });
  };

  return (
    <>
      <Loader isLoading={authenticating} />
      <Card style={{ width: '30rem' }} className=' profile m-auto p-1 mt-5'>
        <Card.Img variant='top' src='/images/profile.svg' />
        <Card.Body>
          <Card.Title className='profile-title'>
            Hi,
            {!profile.isUsernameEdit ? (
              <>
                {profile.username}!
                <FontAwesomeIcon
                  size='sm'
                  icon='edit'
                  className='profile-btn'
                  onClick={(e) =>
                    setProfile((prof) => ({ ...prof, isUsernameEdit: true }))
                  }
                />
              </>
            ) : (
              <>
                <Control
                  type='text'
                  name='username'
                  id='username'
                  value={profile.username}
                  onChange={handleChange}
                  className='profile-input mx-1'
                />
                <FontAwesomeIcon
                  size='sm'
                  icon='check-circle'
                  className='profile-btn'
                  onClick={handleProfileUpdate}
                />
              </>
            )}
          </Card.Title>
          <Card.Text className='profile-text'>
            Email :<span className='disabled'>{user.email}</span>
          </Card.Text>
          <Card.Text className='profile-text mb-3'>
            Phone :
            {!profile.isPhoneEdit ? (
              <>
                <span>{profile.phone}</span>
                <FontAwesomeIcon
                  size='sm'
                  icon='edit'
                  className='profile-btn'
                  onClick={(e) =>
                    setProfile((prof) => ({ ...prof, isPhoneEdit: true }))
                  }
                />
              </>
            ) : (
              <>
                <Control
                  type='tel'
                  name='phone'
                  id='phone'
                  value={profile.phone}
                  onChange={handleChange}
                  className='profile-input mx-1'
                />
                <FontAwesomeIcon
                  size='sm'
                  icon='check-circle'
                  className='profile-btn'
                  onClick={handleProfileUpdate}
                />
              </>
            )}
          </Card.Text>
          <Card.Text>
            <Button
              onClick={(e) => setIsPassChange(true)}
              disabled={isPassChange}
            >
              Change password
            </Button>
            <Row className={`pass-container ${isPassChange && 'show-pass'}`}>
              <Col sm={10} className='my-3'>
                <Control
                  type='password'
                  id='oldPassword'
                  name='oldPassword'
                  placeholder='Enter old password'
                  value={passObj.oldPassword}
                  onChange={handlePassChange}
                />
              </Col>
              <Col sm={10} className='my-3'>
                <Control
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Enter New password'
                  value={passObj.password}
                  onChange={handlePassChange}
                />
              </Col>

              <Col>
                <Button
                  variant='success'
                  className='mr-3 my-3'
                  onClick={handlePassUpdate}
                >
                  Update password
                </Button>
                <Button
                  variant='danger'
                  className='mr-3 my-3'
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Profile;
