import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("./Navbar"));
const Footer = React.lazy(() => import("./Footer"));
const Newsletter = React.lazy(() => import("./Newsletter"));

function Layout({ children }) {
  return (
    <div className="layout">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <main>{children}</main>
        <Newsletter />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Layout;
