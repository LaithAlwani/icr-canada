import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

export const PaymentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(5);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
      });
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
      console.log(data);
      const confirm = await stripe.confirmCardPayment(data.clientSecret);
      if (confirm.error) return toast.error("payment unsuccessful!");
      toast.success("payment accepted! Subscription Active!");
    } catch (err) {
      console.log(err);
      toast.error(`payment failed ${err.message}`);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <form onSubmit={createSubscription}>
      <h3>Subcribe</h3>
      <p>A monthly contribution to help our community grow!</p>
      <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="number"
        placeholder="$Amount"
        onChange={(e) => setAmount(e.target.value)}
        defaultValue={5}
        min={5}
      />

      <fieldset>
        <CardElement />
      </fieldset>
      <button>{loading ? "..." : "Subcribe"}</button>
    </form>
  );
};
