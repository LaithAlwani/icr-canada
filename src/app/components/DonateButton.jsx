"use client";
import { useState } from "react";
import { StripeContainer } from "./StripeContainer";
import { Model } from "./Model";
export const DonateButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Donate Now</button>
      {isOpen && (
        <Model handleClose={setIsOpen}>
          <StripeContainer />
        </Model>
      )}
    </>
  );
};
