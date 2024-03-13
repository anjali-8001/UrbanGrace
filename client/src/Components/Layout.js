import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Newsletter from "./Newsletter";

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <hr style={{ paddingTop: "100px" }} />
      <main>{children}</main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Layout;