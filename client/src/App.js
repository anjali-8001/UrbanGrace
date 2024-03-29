import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "react-toastify/dist/ReactToastify.css";
import Account from "./Pages/UserPages/Account";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import CreateCategory from "./Pages/AdminPages/CreateCategory";
import CreateProduct from "./Pages/AdminPages/CreateProduct";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetails from "./Pages/ProductDetails";
import { useLoading } from "./Contexts/loading";
import Spinner from "./Components/Spinner";
import Cart from "./Pages/Cart";
import ScrollToTopOnRouteChange from "./Components/ScrollToTopOnRouteChange";
import Search from "./Pages/Search";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPasswordRoute from "./Components/ForgotPasswordRoute";

function App() {
  const [loading] = useLoading();
  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
              <Route path="user" element={<Account />} />
            </Route>
            <Route path="/account" element={<AdminProtectedRoute />}>
              <Route path="admin" element={<Account />} />
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
              <Route path="admin/create-product" element={<CreateProduct />} />
            </Route>
            <Route
              path="/category/:categoryId"
              element={<ProductsPage />}
            ></Route>
            <Route
              path="/product/:productId"
              element={<ProductDetails />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/search" element={<Search />}></Route>
          </Routes>
        </>
      )}
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
