// Cart.jsx
import React from 'react';
import CartItem from './CartItem';
import { AiFillCloseCircle } from 'react-icons/ai';
import mercedes from "../../assets/iris 1.png"
// import sedan from "../../assets/iris-2.png"


const Cart = ({ toggleCart }) => {


	const cartItems = [
		{ id: 1, name: 'Mercedes Benz S600', model: 'Model 2016', price: 300, quantity: 1 },
		{ id: 2, name: 'Mercedes Benz C200', model: 'Model 2014', price: 250, quantity: 2 }
	];

	const recommendedItem = {
		name: 'Jeep ML2',
		model: 'Model 2018',
		price: 350
	};

	// Calculate subtotal
	const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

	return (
		<div className="container absolute top-20 right-14 z-50 w-auto  mx-auto p-6 bg-white rounded-lg shadow-md">
			<div className='flex justify-between'>
				<h2 className="text-2xl font-bold">Your cart <span className='text-red-400'>(3)</span></h2>
				<AiFillCloseCircle size={25} color='#F87171' onClick={toggleCart} className=' cursor-pointer hover:scale-125 duration-300' />
			</div>
			{cartItems.map(item => <CartItem key={item.id} {...item} />)}

			<div className="p-4 border-t border-b border-gray-200">
				<h3 className="text-lg font-bold mb-2">We Recommend</h3>
				<div className="flex items-center justify-between">
					<img src={mercedes} alt={recommendedItem.name} className="h-24 mr-4 max-w-sm" />
					<div>
						<h5 className="font-bold">{recommendedItem.name}</h5>
						<p>{recommendedItem.model}</p>
						<p className="font-bold">{recommendedItem.price} DH</p>
					</div>
					<button className='rounded-xl border text-white border-black bg-black hover:bg-zinc-500 font-semibold flex px-8 py-3 justify-center items-center'>Add</button>
				</div>
			</div>

			<div className="p-4 flex flex-col items-end bg-zinc-200 rounded-lg">
				<div className='flex w-full justify-between my-2'>
					<h3 className="text-2xl font-bold mb-2">Sub Total</h3>
					<p className="text-xl mb-4">{subtotal} DH</p>
				</div>
				<div className='flex space-x-2 mx-auto my-4'>
					<button className="rounded-xl border border-black hover:bg-zinc-300 font-semibold flex px-8 py-4 justify-center items-center">Continue Shopping</button>
					<button className='rounded-xl border border-black  bg-yellow-400 hover:bg-yellow-500 font-bold flex px-8 py-4 justify-center items-center'>Check Out</button>
				</div>
				<p className="text-xs m-auto text-gray-600 mt-2">By selecting 'Check Out' you are agreeing to our Terms & Conditions</p>
			</div>
		</div>
	);
};

export default Cart;
