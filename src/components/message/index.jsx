import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ type, message }) => {
  const alertType = type === 'alert-success' ? 'success' : 'danger';

  return (
    <Alert variant={alertType}>
      {message && Array.isArray(message) ? (
        <ul>
          {message.map((msg, ind) => (
            <li key={`${type}-${ind}`} className='alert-text'>
              {msg}
            </li>
          ))}
        </ul>
      ) : (
        <p className='alert-text'>{message}</p>
      )}
    </Alert>
  );
};

export default Message;
