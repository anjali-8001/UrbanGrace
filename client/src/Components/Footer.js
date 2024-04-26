import React from "react";
import "../Styles/Footer.css";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import logo from "../Images/logo.jpeg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerbrandContainer">
        <div className="brandTitle">
          <img src={logo} alt="" />
          <p>Urbangrace</p>
        </div>
        <div className="brandDescription">
          Urbangrace is a dynamic clothing brand, embodying innovation and
          growth. Rooted in our core values of sustainable styling, we offer
          unique variety to elevate the lifestyle of our customers. Join us on a
          journey of continuous evolution, where urbangrace is not just a brand
          but a living, breathing entity.
        </div>
      </div>
      <div className="footerLinksContainer">
        <div className="footerLinksHeading">Useful Links</div>
        <div className="footerLinksSubContainer">
          <div className="footerLinks">
            <Link to="/" className="footerLink">
              Home
            </Link>
            <Link
              to="/category/Men"
              className="footerLink"
            >
              Men Fashion
            </Link>
            <Link to="/account/user" className="footerLink">
              Accessories
            </Link>
            <Link to="/wishlist" className="footerLink">
              Order Tracking
            </Link>
          </div>
          <div className="footerLinks">
            <Link to="/cart" className="footerLink">
              Cart
            </Link>
            <Link
              to="/category/Women"
              className="footerLink"
            >
              Women Fashion
            </Link>
            <Link to="/account/user" className="footerLink">
              My Account
            </Link>
            <Link to="/wishlist" className="footerLink">
              Wishlist
            </Link>
          </div>
        </div>
      </div>
      <div className="footerContactContainer">
        <div className="footerContactHeading">Contact</div>
        <div className="footerContactSubContainer">
          <div className="footerContactItem">
            <IoLocationOutline className="footerIcon" />
            <span>126, ABC Mall, Delhi</span>
          </div>
          <div className="footerContactItem">
            <FiPhone className="footerIcon" />
            <span>+91-9999999000</span>
          </div>
          <div className="footerContactItem">
            <CiMail className="footerIcon" />
            <span>contact@urbangrace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
