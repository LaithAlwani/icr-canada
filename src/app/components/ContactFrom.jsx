"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export const ContactFrom = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const[loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!text) setTextError(true);
    if (name && email && text) {
      const toastId = toast.loading("Seding request");
      toastId;
      setLoading(true);
      setTimeout(() => {
        toast.dismiss(toastId);
        setName("");
        setEmail("");
        setText("");
        setLoading(false);
        toast.success("Request sent!");
      }, 3000);
    } else {
      toast.error("please enter missing fields");
    }
  };

  return (
    <section>
      <h2>Contact Us</h2>
      <form className="model p-0" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
          className={nameError ? "invalid" : ""}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          className={emailError ? "invalid" : ""}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTextError(false);
          }}
          className={textError ? "invalid" : ""}></textarea>

        <button disabled={loading}>{loading ? "..." : "Submit"}</button>
      </form>
    </section>
  );
};
