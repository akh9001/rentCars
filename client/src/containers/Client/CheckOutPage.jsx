import React from 'react'
import CheckoutSteps from "../../components/Client/Checkout/CheckoutSteps";
import Checkout from "../../components/Client/Checkout/Checkout";
import LightNavBar from '../../components/Client/LightNavBar';
import CheckoutForm from '../../components/CheckoutForm';

const CheckoutPage = () => {
  
  return (
    <div className='flex-col items-center justify-center bg-[#F2F2F2]'>
        <LightNavBar/>
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
    </div>
  )
}

export default CheckoutPage