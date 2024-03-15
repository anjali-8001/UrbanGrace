import React, { useState } from "react";
import "../Styles/Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../Contexts/auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  const [auth, setAuth] = useAuth();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API}/auth/login`, {
          email,
          password,
        })
        .catch(async (error) => {
          toast.error(error.response.data.message);
        });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login">
      <Layout>
        <div className="loginContainer">
          <div className="loginHeading">Login</div>
          <form className="loginForm" onSubmit={onSubmitHandler}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
            />
            <div className="loginPassword">
              <input
                type={type}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Password"
              />
              {type === "password" ? (
                <p onClick={() => setType("input")}>
                  <FaRegEyeSlash />
                </p>
              ) : (
                <p onClick={() => setType("password")}>
                  <FaRegEye />
                </p>
              )}
            </div>
            <Link to="" className="loginForgotPassword">
              Forgot your password?
            </Link>
            <button type="submit" className="loginButton">
              Sign In
            </button>
            <Link to="/register" className="loginCreateAccount">
              Create account
            </Link>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Login;
