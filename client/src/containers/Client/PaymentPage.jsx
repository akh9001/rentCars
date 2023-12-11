import React from 'react'
import CheckoutSteps from '../../components/Client/Checkout/CheckoutSteps'
import Payment from "../../components/Client/Payment/Payment";
import LightNavBar from '../../components/Client/LightNavBar';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
      <LightNavBar/>
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
    </div>
  )
}

export default PaymentPage