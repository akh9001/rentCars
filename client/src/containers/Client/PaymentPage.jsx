import React from 'react'
import CheckoutSteps from '../../components/Client/Checkout/CheckoutSteps'
import Payment from "../../components/Client/Payment/Payment";
import LightNavBar from '../../components/Client/LightNavBar';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#F2F2F2]'>
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