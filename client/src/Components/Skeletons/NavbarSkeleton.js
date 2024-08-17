import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function NavbarSkeleton() {
  return (
    <div className="navbar">
      <div className="navLinksContainer">
        <div to="/category/Women" className="navLink">
          <Skeleton />
        </div>
        <Link to="/category/Men" className="navLink">
          <Skeleton />
        </Link>
      </div>
      <div className="navSignContainer">
        <div></div>
      </div>
    </div>
  );
}

export default NavbarSkeleton;
