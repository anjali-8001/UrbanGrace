import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AccountNavbar from "../../Components/AccountNavbar";
import "../../Styles/Orders.css";
import { useAuth } from "../../Contexts/auth";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

function Orders() {
  const [auth] = useAuth();
  const [orders, setOrders] = useState();

  const getOrder = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/order/get-orders/${auth.user._id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      getOrder();
    }
  }, [auth]);

  const formatDate = (dateString) => {
    return moment(dateString).format("Do MMMM YYYY, hh:mm A");
  };

  return (
    <>
      <Layout>
        <AccountNavbar>
          <div className="ordersContainer">
            <h1>My Orders</h1>
            <hr />
            {orders && orders.length ? (
              orders.map((order, index) => {
                return (
                  <div key={index} className="orderdetailsContainer">
                    <div className="orderNumber">
                      <h5>ORDER NUMBER</h5>
                      <p>UG-123232222e13d1232</p>
                    </div>
                    <div className="orderStatus">Status: {order.status}</div>
                    <div className="orderItemsNumber">
                      <h3>{order.products.length} Item(s)</h3>
                    </div>
                    <div className="orderImgs">
                      {order.products.map((product, index) => {
                        return (
                          <span className="orderImg">
                            <a href={`product/${product.productId}`}>
                              <img src={product.image.url} alt="" />
                            </a>
                          </span>
                        );
                      })}
                    </div>
                    <div className="orderDate">
                      Ordered on <b>{formatDate(order.createdAt)}</b>
                    </div>
                    <div className="orderDate">
                      Total: <b>₹{order.total}</b>
                    </div>
                    <div className="orderAddress">
                      Address:{" "}
                      <b>
                        {order.shipping.address.line1}
                        ,&nbsp;
                        {order.shipping.address.line2}
                        ,&nbsp;
                        {order.shipping.address.city}
                        ,&nbsp;
                        {order.shipping.address.state}
                        ,&nbsp;
                        {order.shipping.address.country}
                        ,&nbsp;
                        {order.shipping.address.postal_code}
                      </b>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4>You have no orders!</h4>
            )}
          </div>
        </AccountNavbar>
      </Layout>
    </>
  );
}

export default Orders;
