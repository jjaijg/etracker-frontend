import React from 'react';

import './Loader.css';

export const Loader = ({ isLoading }) => {
  return (
    <div className={`loader ${isLoading ? 'show' : ''}`}>
      <div className='loader-circle'></div>
      <div className='loader-circle'></div>
      <div className='loader-circle'></div>
      <div className='loader-circle'></div>
    </div>
  );
};

export default Loader;
