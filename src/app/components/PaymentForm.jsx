import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { DonateButton } from "./DonateButton";

export const PaymentForm = ({ setIsOpen }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [paymnetError, setPaymentError] = useState(false);

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
      });
      if (!name) setNameError(true);
      if (!email) setEmailError(true);
      if (!amount) setAmountError(true);
      if (error) setPaymentError(true);
      if (name && email && amount) {
        const respone = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            amount,
            paymentMethod: paymentMethod.id,
          }),
        });

      if (!respone.ok) return toast.error("payment unsuccessful!");
        const data = await respone.json();
        console.log(data.clientSecret);
        const confirm = await stripe.confirmCardPayment(data.clientSecret);
        if (confirm.error) {
        return toast.error("payment unsuccessful!");
        }
        setIsOpen(false);
        setName("");
        setEmail("");
        setAmount("");
        toast.success("payment accepted! Subscription Active!");
      } else {
        toast.error("please enter missing fields");
      }
    } catch (err) {  
      toast.error(`payment failed ${err.message}`);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <form onSubmit={createSubscription}>
      <h3>Become a Donor</h3>
      <p>A monthly contribution to help our community prosper!</p>

      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
          setNameError(false);
        }}
        className={nameError ? "invalid" : ""}
      />

      <input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
        }}
        className={emailError ? "invalid" : ""}
      />

      <input
        type="number"
        placeholder="$ Amount"
        onChange={(e) => {
          setAmount(e.target.value);
          setAmountError(false);
        }}
        min={5}
        className={amountError ? "invalid" : ""}
      />

      <fieldset className={paymnetError ? "invalid" : ""}>
        <CardElement
          onChange={() => {
            setPaymentError(false);
          }}
        />
      </fieldset>
      <button disabled={loading}>{loading ? "..." : "Subscribe"}</button>
    </form>
  );
};
