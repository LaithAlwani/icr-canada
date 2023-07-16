import { Toaster } from "react-hot-toast";
import { ContactFrom } from "./components/ContactFrom";
import { About } from "./components/About";

export default function Home() {
  return (
    <>
      <Toaster />
      <div className="banner"></div>
      <About />
      <ContactFrom />
    </>
  );
}
