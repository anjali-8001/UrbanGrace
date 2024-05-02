import React from "react";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";

// const Navbar = React.lazy(() => import("./Navbar"));
// const Footer = React.lazy(() => import("./Footer"));
// const Newsletter = React.lazy(() => import("./Newsletter"));

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Layout;
