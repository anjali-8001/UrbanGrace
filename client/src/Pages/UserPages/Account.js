import React from "react";
import "../../Styles/Account.css";
import Layout from "../../Components/Layout";
import AccountNavbar from "../../Components/AccountNavbar";

function Account() {
  return (
    <div className="account">
      <Layout>
        <AccountNavbar>
          <div className="accountContentContainer">
            <div className="accountContent">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reiciendis id explicabo velit, voluptatum eos tempora ex libero
              asperiores, esse laborum veritatis aspernatur officiis sapiente
              enim distinctio quis dignissimos quam odio?
            </div>
          </div>
        </AccountNavbar>
      </Layout>
    </div>
  );
}

export default Account;
