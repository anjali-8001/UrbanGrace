import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import "../Styles/Cart.css";
import { useAuth } from "../Contexts/auth";
import { VscClose } from "react-icons/vsc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../Contexts/cart";

function Cart() {
  const { cart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const { deleteProductFromCart } = useCart();

  const handleDeleteItem = async (productId, size) => {
    deleteProductFromCart(productId, size);
  };

  return (
    <Layout>
      <div className="cart">
        <div className="cartContainer">
          <h1 className="cartHeading">Shopping Cart</h1>
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
                  <span>₹{totalPrice}</span>
                </p>
                <p>
                  <b>Shipping: </b>
                  <span>₹0</span>
                </p>
                <hr />
                <p>
                  <b>Total: </b>
                  <span className="totalamt">₹{totalPrice}</span>
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
