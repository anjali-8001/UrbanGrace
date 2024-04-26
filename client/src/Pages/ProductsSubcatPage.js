import "../Styles/ProductsSubcatPage.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import Product from "../Components/Product";
import axios from "axios";
import { useAuth } from "../Contexts/auth";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

function ProductsSubcatPage() {
  const { categoryName, subcategoryName } = useParams();
  const [subcategories, setSubcategories] = useState();
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const getSubCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/category/get-subcategories/${categoryName}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        setSubcategories(res.data.subcategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcategories");
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      // console.log("Page" + page);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/product/get-productsByType/${categoryName}/${subcategoryName}`,
        {
          page: page,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        const newProducts = res.data.products;
        if (newProducts.length === 0) {
          setLoading(false);
          return;
        }
        setProducts((prevData) => [...prevData, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    if (inView && !loading) {
      // console.log("inview useffect");
      getProducts();
    }
  }, [inView, categoryName, subcategoryName]);

  useEffect(() => {
    getSubCategories();
    setPage(1);
    setProducts([]);
    window.scrollTo(0, 0);
  }, [categoryName, subcategoryName]);

  return (
    <div className="productsPage">
      <Layout>
        <div className="productsPageContainer">
          <div className="productsNavbar">
            <div className="productsNavbarHeading">Categories</div>
            <ul className="productsNavbarList">
              {subcategories?.map((subcat, index) => {
                return (
                  <Link
                    key={index}
                    to={`/category/${categoryName}/${subcat.name}`}
                    className="productsNavbarItem"
                  >
                    <li>{subcat.name}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="productsOuterContainer">
            <div className="productsContainer">
              {products?.map((product, index) => {
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

export default ProductsSubcatPage;
