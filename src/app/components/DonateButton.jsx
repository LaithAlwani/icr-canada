"use client";
import { useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import { PaymentForm } from './PaymentForm';
import { Model } from "./Model";

export const DonateButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Donate Now</button>
      {isOpen && (
        <Model handleClose={setIsOpen}>
          <StripeContainer setIsOpen={setIsOpen} />
        </Model>
      )}
    </>
  );
};


export const StripeContainer = ({setIsOpen}) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm setIsOpen={setIsOpen} />
    </Elements>
  )
}
