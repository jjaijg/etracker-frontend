import React from 'react';
import Toast from '../toast';
import Alert from '../alert';
import { useState, useEffect } from 'react';

const COLOR = ['red', 'green'];

const DisplayMessage = ({ status }) => {
  const [messageStatus, setMessageStatus] = useState(status);
  useEffect(() => {
    setMessageStatus(status);
  }, [status]);

  'Message status : ', status;
  let Message = null;
  if (messageStatus?.message) {
    const { success, message, showToast, showAlert } = status;
    if (showToast) {
      Message = (
        <Toast show={showToast} message={message} variant={COLOR[success]} />
      );
    }
  }
  return Message;
};

export default DisplayMessage;
