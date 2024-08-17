import React, { useState } from "react";
import "../Styles/Navbar.css";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/auth";
import { FaRegHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import { useSearch } from "../Contexts/search";
import logo from "../Images/logo.jpeg";
import { useCart } from "../Contexts/cart";
import { CiLogin } from "react-icons/ci";
import Hamburger from "hamburger-react";

function Navbar() {
  const [auth] = useAuth();
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values?.keyword) {
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/search/${values.keyword}`
      );
      if (res?.data.success) {
        setValues({ ...values, result: res.data.products });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  

  return (
    <>
      <div className="navbar">
        <div className="navLogoContainer">
          <Link to="/" className="navLink">
            <img src={logo} width="80" height="80" alt="Logo" />
          </Link>
        </div>

        <div className="navLinksContainer">
          <Link to="/category/Women" className="navLink">
            Women
          </Link>
          <Link to="/category/Men" className="navLink">
            Men
          </Link>
        </div>
        <div className="navSignContainer">
          <div>
            <form className="searchForm" onSubmit={handleSubmit}>
              <button type="submit" aria-label="Search">
                <IoIosSearch className="searchicon" size={27} color="black" />
              </button>
              <input
                type="input"
                placeholder="Search"
                value={values.keyword}
                name="search"
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
            </form>
          </div>

          {auth?.user ? (
            <>
              {/* <div>
                <Link>
                  <FaRegHeart
                    className="likeIcon"
                    size={25}
                    color="black"
                    aria-label="Wishlist"
                  />
                </Link>
              </div> */}
              <div className="cartIcon">
                <Link to="/cart" className="link">
                  <MdOutlineShoppingCart className="carticon" size={26} />
                  <span className="cartTotalItems">{totalItems}</span>
                </Link>
              </div>
              <div>
                <Link
                  to={
                    auth.user
                      ? auth.user.isAdmin
                        ? "/account/admin/create-category"
                        : "/account/user/orders"
                      : "/login"
                  }
                >
                  <FaRegUser
                    className="usericon"
                    size={23}
                    color="black"
                    aria-label="Profile"
                  />
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link className="loginicon" to="/login">
                <span>Login</span>
                <CiLogin className="" size={23} color="black" />
              </Link>
            </>
          )}
          <div className="HamburgerIcon">
            <Hamburger toggled={isOpen} toggle={setOpen} size={26} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={"navSidebar"}>
          <div className="HamburgerIconSidebar">
            <Hamburger toggled={isOpen} toggle={setOpen} size={26} />
          </div>
          <div className="navSidebarSearch">
            <form className="SidebarSearchForm" onSubmit={handleSubmit}>
              <button type="submit" aria-label="Search">
                <IoIosSearch className="searchicon" size={27} color="black" />
              </button>
              <input
                type="input"
                placeholder="Search"
                value={values.keyword}
                name="search"
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
            </form>
          </div>
          <div className="navSidebarLinks">
            <Link to="/category/Women" className="navLink">
              Women
            </Link>
            <Link to="/category/Men" className="navLink">
              Men
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

// #1A2F27
// rgb(209, 209, 209)
