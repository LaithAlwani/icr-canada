import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { PaymentForm } from './PaymentForm';

export const StripeContainer = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}
