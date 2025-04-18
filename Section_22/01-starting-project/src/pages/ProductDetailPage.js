import { useParams, Link } from 'react-router-dom';

import React from 'react';

const ProductDetailPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        <Link to='..' relative='path'>
          Back
        </Link>
      </p>
    </>
  );
};

export default ProductDetailPage;
