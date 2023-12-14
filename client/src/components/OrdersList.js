// ProductPage.js
import React from 'react';
import ProductCard from './ProductCard';

const OrdersList = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 20 },
    { id: 2, name: 'Product 2', price: 30 },
    { id: 3, name: 'Product 3', price: 95 },
  ];

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div>
     <h1 className="text-3xl text-[#353535] font-semibold mb-4 mt-1.5">Order summary</h1>
      
      {products.map((product) => (
        <ProductCard key={product.id} name={product.name} price={product.price}  />
      ))}

      <div className="mt-8">
        <p className="text-xl text-center p-2 text-black bg-yellow-400 font-semibold border rounded w-full">Total: ${calculateTotal()}</p>
      </div>
    </div>
  );
};

export default OrdersList;
