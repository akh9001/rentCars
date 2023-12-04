import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Handle shipping address submission logic here
    console.log("Shipping address submitted:", formData);

    const result = await stripe.confirmCardPayment("{CLIENT_SECRET}", {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: formData.name,
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded");

        // Log additional transaction details
        console.log("Payment Intent ID:", result.paymentIntent.id);
        console.log("Payment Method ID:", result.paymentIntent.payment_method);
        console.log("Transaction Amount:", result.paymentIntent.amount);
        console.log("Currency:", result.paymentIntent.currency);

        onSuccess(); // Call the parent component's success callback
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <h2 className="text-3xl font-semibold text-[#353535] py-3 mt-4">
        Shipping Information
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="w-full border rounded p-2 outline-none"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="w-full border rounded p-2 outline-none"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Company"
            className="w-full border rounded p-2 outline-none"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            className="w-full border rounded p-2 outline-none"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            className="w-full border rounded p-2 outline-none"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal Code"
            className="w-full border rounded p-2 outline-none"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full border rounded p-2 outline-none"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-[#353535] py-3 mt-4">
        Payment Details
      </h2>
      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 p-2 border rounded w-full focus:outline-none"
          placeholder="John Doe"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <div className="p-2 border rounded focus:outline-none">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                    
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex align-center py-3">
        <input type="checkbox" />
        <p className="ml-3 font-[1.5rem] text-[#131515]">I agree to the terms of the user agreement.</p>
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="bg-[#FAC300] text-black font-semibold w-full px-4 py-2 rounded hover:bg-yellow-600"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;