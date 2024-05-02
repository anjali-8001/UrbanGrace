import React, { useState } from "react";
import "../../Styles/Product.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductSkeleton() {
  return (
    <div className="product">
      <div className="productImg">
        <Skeleton height={350} />
      </div>

      <div className="productDetails">
        <p>
          <Skeleton />
        </p>
        <p>
          <Skeleton />
        </p>
      </div>
    </div>
  );
}

export default ProductSkeleton;
