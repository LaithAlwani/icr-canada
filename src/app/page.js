import { Toaster } from "react-hot-toast";
import { ContactFrom } from "./components/ContactFrom";
import { About } from "./components/About";

export default function Home() {
  const toastOptions = {
    duration: 5000,
    success: {
      style: {
        background: "green",
        color: "white",
        fontWeight: "bold",
      },
      iconTheme: {
        primary: "white",
        secondary: "green",
      },
    },
    error: {
      style: {
        background: "red",
        color: "white",
        fontWeight: "bold",
      },
      iconTheme: {
        primary: "white",
        secondary: "red",
      },
    },
  };
  return (
    <>
      <Toaster toastOptions={toastOptions} />
      <div className="banner"></div>
      <About />
      <ContactFrom />
    </>
  );
}
