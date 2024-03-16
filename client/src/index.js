import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Contexts/auth";
import { LoadingProvider } from "./Contexts/loading";
import { SearchProvider } from "./Contexts/search";
import { CategoryProvider } from "./Contexts/category";
import { ProductProvider } from "./Contexts/product";
import { CartProvider } from "./Contexts/cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <LoadingProvider>
          <CategoryProvider>
            <SearchProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </SearchProvider>
          </CategoryProvider>
        </LoadingProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
