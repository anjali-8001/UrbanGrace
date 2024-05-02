import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import React, { Suspense, useLayoutEffect } from "react";
import ProductDetailsSkeleton from "./Components/Skeletons/ProductDetailsSkeleton";
const ProductsPage = React.lazy(() => import("./Pages/ProductsPage"));
const Orders = React.lazy(() => import("./Pages/UserPages/Orders"));
const AccountSettings = React.lazy(() =>
  import("./Pages/UserPages/AccountSettings")
);
const ProductsSubcatPage = React.lazy(() =>
  import("./Pages/ProductsSubcatPage")
);
const ForgotPasswordRoute = React.lazy(() =>
  import("./Components/ForgotPasswordRoute")
);
const ProductDetails = React.lazy(() => import("./Pages/ProductDetails"));
const CreateProduct = React.lazy(() =>
  import("./Pages/AdminPages/CreateProduct")
);
const CreateCategory = React.lazy(() =>
  import("./Pages/AdminPages/CreateCategory")
);
const Cart = React.lazy(() => import("./Pages/Cart"));
const Search = React.lazy(() => import("./Pages/Search"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword"));
const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Pages/Login"));
const Register = React.lazy(() => import("./Pages/Register"));
const Spinner = React.lazy(() => import("./Components/Spinner"));

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route path="/" element={<ForgotPasswordRoute />}>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              ></Route>
              <Route path="/reset-password" element={<ResetPassword />}></Route>
            </Route>
            <Route path="/account" element={<ProtectedRoute />}>
              <Route path="user/orders" element={<Orders />} />
              <Route
                path="user/account-settings"
                element={<AccountSettings />}
              />

              {/* <Route path="user" element={<Account />} /> */}
            </Route>
            <Route path="/account" element={<AdminProtectedRoute />}>
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
              <Route path="admin/create-product" element={<CreateProduct />} />
            </Route>
            <Route
              path="/category/:categoryName"
              element={<ProductsPage />}
            ></Route>
            <Route
              path="/category/:categoryName/:subcategoryName"
              element={<ProductsSubcatPage />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/search" element={<Search />}></Route>

            <Route
              path="/product/:productId"
              element={
                <Suspense fallback={<ProductDetailsSkeleton />}>
                  <ProductDetails />
                </Suspense>
              }
            ></Route>
          </Routes>
        </Suspense>
        <Toaster />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
