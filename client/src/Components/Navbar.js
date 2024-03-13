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

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState();
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/category/get-categories`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

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

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(values?.keyword);
  }, [values]);

  return (
    <div className="navbar">
      <div className="navLogoContainer">
        <Link to="/" className="navLink">
          <div className="navLogo">URBANGRACE</div>
          <div className="navLogoText">Sustainably Styled, Socially Loved</div>
        </Link>
      </div>

      <div className="navLinksContainer">
        <ul>
          {categories?.map((category) => {
            return (
              <li key={category._id}>
                <Link to={`/category/${category._id}`} className="navLink">
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navSignContainer">
        <ul>
          <li>
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
          </li>

          <li>
            <Link>
              <FaRegHeart className="likeIcon" size={25} color="black" />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <MdOutlineShoppingCart
                className="carticon"
                size={26}
                color="black"
              />
            </Link>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

// #1A2F27
// rgb(209, 209, 209)
