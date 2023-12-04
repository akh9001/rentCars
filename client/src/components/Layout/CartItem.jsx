// CartItem.js
import React from 'react';
import { IconButton, Button } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import mercedes from "../../assets/iris 1.png"
import sedan from "../../assets/iris-2.png"


const CartItem = ({ name, model, price, quantity }) => {
	return (
		<div className="flex items-center justify-between p-4 border-b border-gray-200">
			<div className="flex items-center">
				<img src={sedan} alt={name} className="h-24 mr-4" />
				<div>
					<h5 className="text-lg font-bold">{name}</h5>
					<p>{model}</p>
					<p className="font-bold">{price} DH</p>
				</div>
			</div>

			<div className="flex items-center">
				<IconButton size="small"><RemoveIcon /></IconButton>
				<span className="mx-2">{quantity}</span>
				<IconButton size="small"><AddIcon /></IconButton>
				<IconButton size="small" className="ml-4"><DeleteIcon /></IconButton>
			</div>
		</div>
	);
};

export default CartItem;
