import React, { useEffect } from "react";
import "../Styles/Home.css";
import Layout from "../Components/Layout";
import { useProduct } from "../Contexts/product";
import Product from "../Components/Product";
import { Link } from "react-router-dom";

function Home() {
  const { featuredProducts } = useProduct();

  return (
    <div className="home">
      <Layout>
        <div className="bannerContainer">
          <div className="banner">
            <div className="bannerTextHeading">
              "Elevate Your Everyday Elegance"
            </div>
            <div className="bannerText">The Newest Collection is here!</div>
            <div className="bannerButtons">
              <Link className="link" to="category/65b7bda383502abf27691113">
                <div className="bannerButton">Shop Women</div>
              </Link>
              <Link className="link" to="category/65b87fd6716c79545c9431af">
                <div className="bannerButton">Shop Men</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="homeTaglineContainer">
          <div className="tagline">
            Style with a purpose, harmonizing trends with sustainability for a
            better tomorrow.
          </div>
        </div>
        <div className="homeItems1">
          {featuredProducts.slice(0, 4).map((product) => (
            <Link
              key={product._id}
              className="link"
              to={`/product/${product._id}`}
            >
              <Product
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image.url}
              />
            </Link>
          ))}
        </div>
        <div className="discountTextContainer">
          <div className="discountTextHeading">Looking For a Group Deal?</div>
          <div className="discountText">
            Walking groups, community groups or employee gifting - get in
            contact with us to get your discount on all bulk purchases.
          </div>
          <div className="discountEmail">Email us at contact@urbangrace.in</div>
        </div>
        <div className="homeItems2">
          <div className="homeItem2TextContainer">
            <div className="homeItem2TextHeading">* * * * *</div>
            <div className="homeItem2Text">
              The Weekend sneakers have a very nice padding in the sole which
              makes it comfortable to wear for long periods of time and these
              shoes definitely fit very true to size.
            </div>
            <div className="homeItem2Subtext">Richard</div>
          </div>
          <div className="homeItem2Img">
            {featuredProducts
              .filter((product) => product._id === "65d2232ea246793046910a01")
              .map((product) => (
                <Link
                  key={product._id}
                  className="link"
                  to={`/product/${product._id}`}
                >
                  <img
                    key={product.id}
                    src={product.image.url}
                    alt="Product Img"
                  />
                </Link>
              ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
