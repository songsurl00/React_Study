import { Link, useNavigate } from 'react-router-dom';

import React from 'react';

const HomePage = () => {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate('/products');
  };

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to='products'>Products Page</Link>
      </p>
      <p>
        <button onClick={navigationHandler}>Navigate</button>
      </p>
    </>
  );
};

export default HomePage;
