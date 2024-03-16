import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import "../Styles/Cart.css";
import { useAuth } from "../Contexts/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { VscClose } from "react-icons/vsc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function Cart() {
  const [auth] = useAuth();
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const navigate = useNavigate();

  const getCart = async () => {
    if (auth?.user) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/cart/get-cart`,
          {
            user: auth?.user,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        if (res?.data.success) {
          setCart(res.data.cart);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting products");
      }
    } else {
      // localStorage.getItem(cart);
      // setCart(cart);
    }
  };

  const handleDeleteItem = async (productId, size) => {
    if (auth?.user) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/cart/delete-product`,
          {
            user: auth?.user,
            productId: productId,
            size: size,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        if (res?.data.success) {
          setCart(res.data.cart);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting products");
      }
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Layout>
      <div className="cart">
        <div className="cartContainer">
          <h1 className="cartHeading">Shopping Cart</h1>
          {cart.products && cart.products.length > 0 ? (
            <>
              <table>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                {cart &&
                  cart.products.map((product) => {
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
                              handleDeleteItem(product.productId, product.size)
                            }
                            className="cartDeleteItem"
                          >
                            <VscClose color="grey" className="cartDeleteIcon" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </table>
              <div className="cartTotalContainer">
                <p>
                  <b>SubTotal: </b>
                  <span>₹{cart?.bill}</span>
                </p>
                <p>
                  <b>Shipping: </b>
                  <span>₹0</span>
                </p>
                <hr />
                <p>
                  <b>Total: </b>
                  <span className="totalamt">₹{cart?.bill}</span>
                </p>
              </div>
              <button className="continueShopping" onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack className="backIcon" />
                <p>Continue Shopping</p>
              </button>
            </>
          ) : (
            <>
              <h2 className="emptyCart">No Products to show.</h2>
              <button className="continueShopping" onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack className="backIcon" />
                <p>Continue Shopping</p>
              </button>
            </>
          )}
        </div>
        <div className="paymentContainer">
          <h1 className="paymentHeading">Payment Info</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
