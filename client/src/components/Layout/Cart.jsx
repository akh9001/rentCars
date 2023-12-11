import React from 'react';
import CartItem from './CartItem';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../slices/cartSlice';
import { selectCartItems, selectCartTotal } from '../../slices/cartSlice';
import { toast } from 'react-toastify';

const Cart = ({ toggleCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const updateQuantity = (id) => {
    dispatch(addToCart(id));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const renderCartItems = cartItems.map((item) => (
    <CartItem key={item.id} {...item} updateQuantity={updateQuantity} />
  ));

  return (
    <div className="container absolute top-20 right-14 z-50 w-auto mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">
          Your cart <span className="text-red-400">({cartItems.length})</span>
        </h2>
        <AiFillCloseCircle
          size={25}
          color="#F87171"
          onClick={toggleCart}
          className="cursor-pointer hover:scale-125 duration-300"
        />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-lg text-center mt-4 p-10">You cart is empty!</p>
      ) : (
        renderCartItems
      )}

      {cartItems.length > 0 && (
        <div className="p-4 flex flex-col items-end bg-zinc-200 rounded-lg">
          <div className="flex w-full justify-between my-2">
            <h3 className="text-2xl font-bold mb-2">Sub Total</h3>
            <p className="text-xl mb-4">{subtotal} DH</p>
          </div>
          <div className="flex space-x-2 mx-auto my-4">
            <button className="rounded-xl border border-black hover:bg-zinc-300 font-semibold flex px-8 py-4 justify-center items-center">
              Continue Shopping
            </button>
            <button
              className="rounded-xl border border-black bg-yellow-400 hover:bg-yellow-500 font-bold flex px-8 py-4 justify-center items-center"
              onClick={() => toast.success('Proceeding to Checkout')}
            >
              Check Out
            </button>
          </div>
          <p className="text-xs m-auto text-gray-600 mt-2">
            By selecting 'Check Out' you are agreeing to our Terms & Conditions
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
