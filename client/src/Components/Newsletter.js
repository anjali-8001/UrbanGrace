import React from "react";
import "../Styles/Newsletter.css";

function Newsletter() {
  return (
    <div className="contactTextContainer">
      <div className="contactTextHeading">Let's Stay in Touch!</div>
      <div className="contactText">
        Subscribe to our newsletter and get 10% off on your first purchase.
      </div>
      <div className="contactEmail">
        <form action="">
          <input
            className="contactUserEmail"
            type="email"
            name="newsletterEmail"
            placeholder="Your e-mail"
          />
          <button type="submit" className="contactUserEmailButton">
            Get 10% off
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
