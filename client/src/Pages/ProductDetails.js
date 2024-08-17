import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Contexts/auth";
import toast from "react-hot-toast";
import "../Styles/ProductDetails.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import ProductDetailsSkeleton from "../Components/Skeletons/ProductDetailsSkeleton";
import { useCart } from "../Contexts/cart";

function ProductDetails() {
  const { productId } = useParams();
  const [auth] = useAuth();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const { addProductToCart } = useCart();

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/get-product/${productId}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        setProduct(res.data.product);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcategories");
    }
  };

  const handleAddProduct = async () => {
    if (!auth?.user) {
      navigate("/login");
    } else {
      addProductToCart(productId, quantity, size);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      {product ? (
        <Layout>
          <div className="productDetailsPage">
            <div className="productImageContainer">
              <img src={product.image.url} alt="productImg" />
            </div>

            <form className="productDetailsContainer" action="">
              <div className="productName">
                <p>{product.name}</p>
                {/* {isLiked ? (
                  <FcLike
                    size={30}
                    onClick={() => setIsLiked((prev) => !prev)}
                  />
                ) : (
                  <AiTwotoneHeart
                    size={30}
                    onClick={() => setIsLiked((prev) => !prev)}
                  />
                )} */}
              </div>
              <div className="productPrice">
                <p>MRP inclusive of all taxes</p>
                <p className="productPriceValue">₹ {product.price}</p>
              </div>
              <hr />
              <div className="productSize">
                <div className="productSizeDetails">
                  <p>Select Size</p>
                  <a href="" className="sizeChart">
                    <p>Size Chart</p>
                  </a>
                </div>
                <div className="productSizeIcons">
                  <label
                    className={size === "S" ? "selectedSize" : "productSize"}
                  >
                    {" "}
                    <input
                      type="radio"
                      name="size"
                      value="S"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    S
                  </label>
                  <label
                    className={size === "M" ? "selectedSize" : "productSize"}
                  >
                    {" "}
                    <input
                      type="radio"
                      name="size"
                      value="M"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    M
                  </label>
                  <label
                    className={size === "L" ? "selectedSize" : "productSize"}
                  >
                    {" "}
                    <input
                      type="radio"
                      name="size"
                      value="L"
                      onChange={(e) => setSize(e.target.value)}
                    />
                    L
                  </label>
                </div>
              </div>
              <div className="productOuantity">
                <p>Quantity</p>
                <div className="quantityValue">
                  <button
                    className="decrement"
                    onClick={(e) => {
                      e.preventDefault();
                      if (quantity > 0) {
                        setQuantity((prev) => prev - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    type="Text"
                    className="numberInput"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(event.target.value.replace(/\D/g, ""))
                    }
                    required
                  />
                  <button
                    className="increment"
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity((prev) => prev + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="productButtons">
                <button
                  className="addToCartButton"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddProduct();
                  }}
                >
                  <MdOutlineShoppingCart size={18} />
                  Add To Cart
                </button>
              </div>
              <div className="productDelivery">
                <TbTruckDelivery size={20} />
                <span>Delivery Time : 4-7 days</span>
              </div>
              <hr />
              <div className="productDescription">
                <p> Product Description</p>
                {product.description}
              </div>
            </form>
          </div>
        </Layout>
      ) : (
        <div className="productDetailsloader">
          <ProductDetailsSkeleton />
        </div>
      )}
    </>
  );
}

export default ProductDetails;
