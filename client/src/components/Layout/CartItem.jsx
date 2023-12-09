// CartItem.js
import React from 'react';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { removeFromCart } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';
import sedan from "../../assets/iris-2.png";




const CartItem = ({ carImage,carModel,fuelType,price,transmission,_id}) => {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div className="flex items-end justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <img src={sedan} alt={carModel} className="h-24 mr-4" />
        <div>
          <h5 className="text-lg font-bold">{carModel}</h5>
          <p>{carModel}</p>
          <p className="font-bold">{price} DH</p>
        </div>
      </div>

      <div>
        <IconButton size="small" className="ml-4" onClick={removeItem}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
