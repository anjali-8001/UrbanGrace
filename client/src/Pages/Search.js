import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../Contexts/search";
import Product from "../Components/Product";
import axios from "axios";
import { useAuth } from "../Contexts/auth";
import toast from "react-hot-toast";

function Search() {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [loading, setLoading] = useState();
  const ref = useRef();
  const [categories, setCategories] = useState();
  const [auth, setAuth] = useAuth();

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/category//get-categories`,
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
      toast.error("Something went wrong in getting subcategories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div className="productsPage">
      <Layout>
        <div className="productsPageContainer">
          <div className="productsNavbar">
            <div className="productsNavbarHeading">Categories</div>
            {/* <ul className="productsNavbarList">
              {categories?.map((category, index) => {
                return (
                  <Link key={index} to={``} className="productsNavbarItem">
                    <li>{category.name}</li>
                  </Link>
                );
              })}
            </ul> */}
          </div>
          <div className="productsOuterContainer">
            <div className="productsContainer">
              {values?.result?.map((product, index) => {
                return (
                  <Link
                    key={product._id}
                    className="link"
                    to={`/product/${product._id}`}
                  >
                    <Product
                      name={product.name}
                      price={product.price}
                      image={product.image.url}
                    />{" "}
                  </Link>
                );
              })}
            </div>
            <div ref={ref} className="loader">
              {loading && <p>Loading</p>}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Search;
