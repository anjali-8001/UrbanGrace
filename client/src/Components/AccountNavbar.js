import React from "react";
import "../Styles/AccountNavbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/auth";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { adminAccountNavbar, userAccountNavbar } from "../Data/data";

function AccountNavbar({ children }) {
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleSignOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navbar = auth?.user.isAdmin ? adminAccountNavbar : userAccountNavbar;

  return (
    <div className="accountNavbar">
      <div className="accountContainer">
        <div className="accountNavbarContainer">
          <h1 className="accountNavbarHeading">My Account</h1>
          <div className="accountNavLinksContainer">
            {navbar.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`accountNavLink ${
                    isActive(item.path) && "navLinkActive"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              onClick={handleSignOut}
              to="/login"
              className={`accountNavLink`}
            >
              Sign Out
            </Link>
          </div>
        </div>
        <main>{children}</main>
      </div>
      <Toaster />
    </div>
  );
}

export default AccountNavbar;
