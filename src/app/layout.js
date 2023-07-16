import Image from "next/image";
import { DonateButton } from "./components/DonateButton";
import "./globals.css";
import {FaFacebookF,FaInstagram, FaTwitter} from "react-icons/fa"

export const metadata = {
  title: "ICR-Canada",
  description: "Dontaite to a better Muslim Community in Canada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/images/logo.jpg" width={64} height={64} alt="logo" />
      </div>
      <DonateButton />
    </nav>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="social-link">
        <a href="#"><FaInstagram/></a>
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaTwitter/></a>
        <a href="#"></a>
      </div>
      <span className="muted">Copy right Ottawa, ON</span>
    </footer>
  );
};
