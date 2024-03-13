import React, { useState } from "react";
import "../Styles/Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import toast from 'react-hot-toast';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      if (res.data.success) {
        console.log("Registered Successfully");
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

    }
  };

  return (
    <div className="register">
      <Layout>
        <div className="registerContainer">
          <div className="registerHeading">Register</div>
          <form className="registerForm" onSubmit={onSubmitHandler}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
              required
            ></input>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
              required
            ></input>
            <button type="submit" className="registerButton">
              Create Account
            </button>
            <Link to="/login" className="loginRedirect">
              Already have an account?
            </Link>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default Register;
