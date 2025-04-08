import { Link } from 'react-router-dom';
import React from 'react';

const PRODUCTS = [
  { id: 'p1', title: '1' },
  { id: 'p2', title: '2' },
  { id: 'p3', title: '3' }
];

const ProductsPage = () => {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map(prod => (
          <li key={prod.id}>
            <Link to={prod.id} relative=''>
              {prod.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;
