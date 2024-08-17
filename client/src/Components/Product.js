import React, { useState } from "react";
import "../Styles/Product.css";
import { FcLike } from "react-icons/fc";
import { AiFillHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

function Product({ image, name, price, id }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="product">
      <div className="productImg">
        <img src={image} width="300" height="400" loading="lazy" alt="ProductImage" />
        {/* {isLiked ? (
          <FcLike
            className="favButton"
            size={28}
            onClick={(event) => {
              event.preventDefault();
              setIsLiked((prev) => !prev);
            }}
          />
        ) : (
          <AiTwotoneHeart
            className="favButton"
            fill="white"
            size={28}
            onClick={(event) => {
              event.preventDefault();
              setIsLiked((prev) => !prev);
            }}
          />
        )} */}
      </div>

      <div className="productDetails">
        <p>{name}</p>
        <p>₹{price}</p>
      </div>
    </div>
  );
}

export default Product;
