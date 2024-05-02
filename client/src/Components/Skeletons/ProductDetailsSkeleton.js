import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import "../../Styles/ProductDetails.css";
import Skeleton from "react-loading-skeleton";

function ProductDetailsSkeleton() {
  return (
    <Layout>
      <div className="productDetailsPage">
        <div className="productImageContainer">
          <Skeleton width={500} height={500} />
        </div>

        <form className="productDetailsContainer" action="">
          <Skeleton />
          <div className="productPrice">
            <p>
              <Skeleton />
            </p>
            <p className="productPriceValue">
              <Skeleton />
            </p>
          </div>
          <div className="productSize">
            <div className="productSizeDetails">
              <Skeleton />
            </div>
            <div className="productSizeIcons">
              <Skeleton width={50} height={50} />
              <Skeleton width={50} height={50} />
              <Skeleton width={50} height={50} />
            </div>
          </div>
          <div className="productOuantity">
            <p>
              <Skeleton width={200} />
            </p>
            <Skeleton width={200} />
          </div>
          <Skeleton />
          <Skeleton width={200} />
          <div className="productDescription">
            <Skeleton count={6} />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ProductDetailsSkeleton;
