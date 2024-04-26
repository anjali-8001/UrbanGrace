import React, { useEffect, useState } from "react";
import "../../Styles/AccountSettings.css";
import Layout from "../../Components/Layout";
import AccountNavbar from "../../Components/AccountNavbar";
import { useAuth } from "../../Contexts/auth";
import axios from "axios";
import toast from "react-hot-toast";

function AccountSettings() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth?.user) {
        const res = await axios.put(
          `${process.env.REACT_APP_API}/auth/update`,
          {
            name,
            phone,
            email,
            address,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );

        if (res?.data?.success) {
          console.log(res.data.updatedUser);
          setAuth({ ...auth, user: res.data.updatedUser });
          toast.success("Details updated successfully");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
      setEmail(auth.user.email);
    }
  }, [auth]);

  return (
    auth?.user && (
      <Layout>
        <AccountNavbar>
          <form className="accountContentContainer" onSubmit={handleSubmit}>
            <h1 className="accountHeading">My Details:</h1>
            <hr />
            <div className="accountDetails">
              <div className="accountDetail">
                <h3 className="detailsHeading">Name : </h3>
                <input
                  className="detailsValue"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="accountDetail">
                <h3 className="detailsHeading">Email : </h3>
                <input
                  className="detailsValue"
                  value={auth?.user.email}
                  disabled
                />
              </div>
              <div className="accountDetail">
                <h3 className="detailsHeading">Phone No : </h3>
                <input
                  className="detailsValue"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="accountDetail">
                <h3 className="detailsHeading">Address : </h3>
                <textarea
                  className="detailsValue"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="saveButton">
              <button type="submit">Save</button>
            </div>
          </form>
        </AccountNavbar>
      </Layout>
    )
  );
}

export default AccountSettings;
