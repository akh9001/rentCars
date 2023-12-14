import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your_public_key"); // Replace with your actual public key

const ShippingForm = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
  };

  return (
    <div className="flex items-center justify-center h-screen sm:px-3">
      <div className="w-full max-w-md">
        {paymentComplete ? (
          <div>
            <h2 className="text-3xl text-green-600 font-extrabold py-3 mb-4 text-center tracking-wide">
              Payment Successful!
            </h2>
            {/* You can add more details or a confirmation message here */}
          </div>
        ) : (
          <div>
            {/* Your existing shipping form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingForm;
