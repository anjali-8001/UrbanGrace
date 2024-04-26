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
import { useProduct } from "../Contexts/product";
import { useCart } from "../Contexts/cart";

function ProductDetails() {
  const { productId } = useParams();
  const [auth] = useAuth();
  const [quantity, setQuantity] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  const { getSingleProduct, singleProduct } = useProduct();
  const { addProductToCart } = useCart();

  // const [uid, setUid] = useState();
  // const [cart, setCart] = useState(() => {
  //   const storedCart = localStorage.getItem("cart");
  //   return storedCart ? JSON.parse(storedCart) : { products: [], bill: 0 };
  // });

  // const getProductDetails = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_API}/product/get-product/${productId}`,
  //       {
  //         headers: {
  //           Authorization: auth?.token,
  //         },
  //       }
  //     );
  //     if (res?.data.success) {
  //       setProduct(res.data.product);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong in getting subcategories");
  //   }
  // };

  const handleAddProduct = async () => {
    if (!auth?.user) {
      navigate("/login");
      toast.error("User login required");
    }
    await addProductToCart(productId, quantity, size);
  };
  // };

  useEffect(() => {
    getSingleProduct(productId);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  return (
    <Layout>
      {singleProduct ? (
        <div className="productDetailsPage">
          <div className="productImageContainer">
            <img src={singleProduct.image?.url} alt="productImg" />
          </div>

          <form className="productDetailsContainer" action="">
            <div className="productName">
              <p>{singleProduct.name}</p>
              {isLiked ? (
                <FcLike size={30} onClick={() => setIsLiked((prev) => !prev)} />
              ) : (
                <AiTwotoneHeart
                  size={30}
                  onClick={() => setIsLiked((prev) => !prev)}
                />
              )}
            </div>
            <div className="productPrice">
              <p>MRP inclusive of all taxes</p>
              <p className="productPriceValue">₹ {singleProduct.price}</p>
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
                  name="number"
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
              {singleProduct.description}
            </div>
          </form>
        </div>
      ) : (
        <div className="productDetailsloader"></div>
      )}
    </Layout>
  );
}

export default ProductDetails;
//  // create uid
//   const storedUid = localStorage.getItem("uid");
//   if (storedUid) {
//     setUid(storedUid);
//   } else {
//     const newUid = generateUid();
//     localStorage.setItem("uid", newUid);
//     setUid(newUid);
//   }
//   if (!size) {
//     toast.error("Size is required!");
//     return;
//   }
//   if (quantity === 0) {
//     toast.error("Quantity is required!");
//     return;
//   }
//   //add product to cart
//   const newCartItem = {
//     productId: product._id,
//     name: product.name,
//     quantity: quantity,
//     image: product.image,
//     size: size,
//     price: product.price,
//   };

//   const newProducts = [...cart.products, newCartItem];
//   const newBill = cart.bill + newCartItem.quantity * newCartItem.price;
//   setCart({
//     products: newProducts,
//     bill: newBill,
//   });
//   toast.success("Product added to cart.");

// const generateUid = () => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
//     /[xy]/g,
//     function (c) {
//       var r = (Math.random() * 16) | 0,
//         v = c == "x" ? r : (r & 0x3) | 0x8;
//       return v.toString(16);
//     }
//   );
