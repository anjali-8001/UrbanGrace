import React from "react";
import "../Styles/Home.css";
import img2 from "../Images/img2.avif";
import img3 from "../Images/img3.avif";
import img4 from "../Images/img4.avif";
import img5 from "../Images/img5.avif";
import img1 from "../Images/img1.avif";
import Layout from "../Components/Layout";

function Home() {
  return (
    <div className="home">
      <Layout>
        <div className="bannerContainer">
          <div className="banner">
            <div className="bannerTextHeading">
              "Elevate Your Everyday Elegance"
            </div>
            <div className="bannerText">The Newest Collection is here!</div>
            <div className="bannerButton">Shop Now</div>
          </div>
        </div>
        <div className="homeTaglineContainer">
          <div className="tagline">
            Style with a purpose, harmonizing trends with sustainability for a
            better tomorrow.
          </div>
        </div>
        <div className="homeItems1">
          <div className="homeItem1">
            <img src={img2} alt="" />
          </div>
          <div className="homeItem1">
            <img src={img3} alt="" />
          </div>
          <div className="homeItem1">
            <img src={img4} alt="" />
          </div>
          <div className="homeItem1">
            <img src={img5} alt="" />
          </div>
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
            <img src={img1} alt="" />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
