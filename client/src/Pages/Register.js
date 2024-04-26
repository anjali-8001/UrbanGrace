import React, { useState } from "react";
import "../Styles/Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { GoCircle } from "react-icons/go";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleChange = (value) => {
    setPassword(value);
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");
    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }
    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }
    if (number.test(value)) {
      setNumberValidated(true);
    } else {
      setNumberValidated(false);
    }
    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }
    if (length.test(value)) {
      setLengthValidated(true);
    } else {
      setLengthValidated(false);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      !lowerValidated ||
      !upperValidated ||
      !numberValidated ||
      !specialValidated ||
      !lengthValidated
    ) {
      toast.error("Password not valid!");
      return;
    }
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
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              autoComplete="yes"
            />
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="yes"
            />
            <div className="registerPassword">
              <input
                type={type}
                value={password}
                name="password"
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
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
            {isPasswordFocused && (
              <div className="tracker-box">
                <div className={lowerValidated ? "validated" : "not-validated"}>
                  {lowerValidated ? (
                    <GoCheckCircleFill color="green" />
                  ) : (
                    <GoCircle />
                  )}
                  At least one lowercase letter
                </div>
                <div className={upperValidated ? "validated" : "not-validated"}>
                  {upperValidated ? (
                    <GoCheckCircleFill color="green" />
                  ) : (
                    <GoCircle />
                  )}
                  At least one uppercase letter
                </div>
                <div
                  className={numberValidated ? "validated" : "not-validated"}
                >
                  {numberValidated ? (
                    <GoCheckCircleFill color="green" />
                  ) : (
                    <GoCircle />
                  )}
                  At least one number
                </div>
                <div
                  className={specialValidated ? "validated" : "not-validated"}
                >
                  {specialValidated ? (
                    <GoCheckCircleFill color="green" />
                  ) : (
                    <GoCircle />
                  )}
                  At least one special character
                </div>
                <div
                  className={lengthValidated ? "validated" : "not-validated"}
                >
                  {lengthValidated ? (
                    <GoCheckCircleFill color="green" />
                  ) : (
                    <GoCircle />
                  )}
                  At least 8 characters
                </div>
              </div>
            )}
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
