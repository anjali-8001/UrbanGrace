import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import "../Styles/Cart.css";
import { useAuth } from "../Contexts/auth";
import { VscClose } from "react-icons/vsc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../Contexts/cart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

function Cart() {
  const [auth] = useAuth();
  const { cart, totalPrice, totalItems, deleteProductFromCart } = useCart();
  const [checkoutDisbaled, setCheckoutDisabled] = useState(false);
  const navigate = useNavigate();

  const handleDeleteItem = async (productId, size) => {
    deleteProductFromCart(productId, size);
  };

  const handleCheckout = async () => {
    const stripe = await loadStripe(`${process.env.PUBLISHABLE_KEY}`);
    try {
      if (auth?.user) {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/checkout/create-checkout-session`,
          {
            user: auth?.user,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );

        if (res?.data?.success) {
          const session = res.data.url;
          window.location.href = session;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    setCheckoutDisabled(totalPrice === 0);
  }, [totalPrice]);

  return (
    <Layout>
      <div className="cart">
        <h1 className="cartHeading">Shopping Cart</h1>
        <div className="cartOuterContainer">
          <div className="cartContainer">
            {cart && totalItems > 0 ? (
              <>
                <table>
                  <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  {cart &&
                    cart.map((product) => {
                      return (
                        <tr key={product._id}>
                          <Link
                            className="link"
                            to={`/product/${product.productId}`}
                          >
                            <td className="cartproductDetails">
                              <div className="cartProductImg">
                                <img src={product.image.url} alt="" />
                              </div>
                              <div className="cartProductName">
                                <h3>{product.name}</h3>
                              </div>
                            </td>
                          </Link>
                          <td className="cartProductSize">
                            <div>{product.size}</div>
                          </td>
                          <td className="cartProductQuantity">
                            <div>{product.quantity}</div>
                          </td>
                          <td className="cartProductPrice">
                            <div>₹{product.price}</div>
                          </td>
                          <td className="cartDelete">
                            <button
                              onClick={() =>
                                handleDeleteItem(
                                  product.productId,
                                  product.size
                                )
                              }
                              className="cartDeleteItem"
                            >
                              <VscClose
                                color="grey"
                                className="cartDeleteIcon"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </table>
                <button
                  className="continueShopping"
                  onClick={() => navigate(-1)}
                >
                  <IoIosArrowRoundBack className="backIcon" />
                  <p>Continue Shopping</p>
                </button>
              </>
            ) : (
              <>
                <h2 className="emptyCart">No Products to show.</h2>
                <button
                  className="continueShopping"
                  onClick={() => navigate(-1)}
                >
                  <IoIosArrowRoundBack className="backIcon" />
                  <p>Continue Shopping</p>
                </button>
              </>
            )}
          </div>
          <div className="orderContainer">
            <h1 className="orderHeading">Order Summary</h1>
            <hr />
            <div className="orderDetails">
              <div className="orderItem">
                <p>Subtotal: </p>
                <p>₹{totalPrice}</p>
              </div>
              <div className="orderItem">
                <p>Shipping: </p>
                <p>Free</p>
              </div>
              <div className="orderItem couponCode">Add coupon code →</div>
            </div>
            <hr />
            <div className="orderTotal">
              <p>Total: </p>
              <p>₹{totalPrice}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="paymentCheckout"
              disabled={checkoutDisbaled}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
