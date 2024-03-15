import React, { useEffect, useState } from "react";
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
import { useCategory } from "../Contexts/category";

function Navbar() {
  const [auth] = useAuth();
  const [categories] = useCategory();
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values?.keyword) {
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/search/${values.keyword}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
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
    <div className="navbar">
      <div className="navLogoContainer">
        <Link to="/" className="navLink">
          <div className="navLogo">URBANGRACE</div>
          <div className="navLogoText">Sustainably Styled, Socially Loved</div>
        </Link>
      </div>

      <div className="navLinksContainer">
        {categories?.map((category) => {
          return (
            <div key={category._id}>
              <Link to={`/category/${category._id}`} className="navLink">
                {category.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="navSignContainer">
        <div>
          <form className="searchForm" onSubmit={handleSubmit}>
            <button type="submit">
              <IoIosSearch className="searchicon" size={27} color="black" />
            </button>
            <input
              type="input"
              placeholder="Search"
              value={values.keyword}
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
          </form>
        </div>

        <div>
          <Link>
            <FaRegHeart className="likeIcon" size={25} color="black" />
          </Link>
        </div>
        <div className="cartIcon">
          <Link to="/cart" className="link">
            <MdOutlineShoppingCart
              className="carticon"
              size={26}
              color="black"
            />
            <span className="cartTotalItems">5</span>
          </Link>
        </div>
        <div>
          <Link
            to={
              auth.user
                ? auth.user.isAdmin
                  ? "/account/admin"
                  : "/account/user"
                : "/login"
            }
          >
            <FaRegUser className="usericon" size={23} color="black" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

// #1A2F27
// rgb(209, 209, 209)
