// ProductCard.js
import React from 'react';

const ProductCard = ({ name, price }) => {
  return (
    <div className="border rounded p-4 mb-4 bg-white w-full lg:w-full">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};

export default ProductCard;
