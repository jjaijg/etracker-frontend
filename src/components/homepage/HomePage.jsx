import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { user, authenticating } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Home Page</h1>
      {authenticating ? (
        <h3>Authenticating</h3>
      ) : (
        <h3>{JSON.stringify(user)}</h3>
      )}
    </div>
  );
};

export default HomePage;
