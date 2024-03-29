import React, { useState } from "react";
import "../Styles/Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../Contexts/auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRecovery } from "../Contexts/recovery";
import "../Styles/ResetPassword.css";
import { GoCheckCircleFill } from "react-icons/go";
import { GoCircle } from "react-icons/go";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [type, setType] = useState("password");
  const [remail, setRemail] = useRecovery();
  const [loading, setLoading] = useState();

  const [auth, setAuth] = useAuth();

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

    if (password !== rpassword) {
      toast.error("Both passwords should be same!");
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/auth/reset-password`,
        {
          email: remail,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="resetContainer">
        <div className="resetHeading">Reset Password</div>
        <form className="resetForm" onSubmit={onSubmitHandler}>
          <div className="resetPassword">
            <input
              type={type}
              value={password}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              placeholder="New Password"
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
              <div className={numberValidated ? "validated" : "not-validated"}>
                {numberValidated ? (
                  <GoCheckCircleFill color="green" />
                ) : (
                  <GoCircle />
                )}
                At least one number
              </div>
              <div className={specialValidated ? "validated" : "not-validated"}>
                {specialValidated ? (
                  <GoCheckCircleFill color="green" />
                ) : (
                  <GoCircle />
                )}
                At least one special character
              </div>
              <div className={lengthValidated ? "validated" : "not-validated"}>
                {lengthValidated ? (
                  <GoCheckCircleFill color="green" />
                ) : (
                  <GoCircle />
                )}
                At least 8 characters
              </div>
            </div>
          )}
          <div className="resetPassword">
            <input
              type={type}
              value={rpassword}
              onChange={(e) => setRpassword(e.target.value)}
              placeholder="Confirm Password"
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
          <button
            type="submit"
            to=""
            className="resetButton"
            disabled={loading && true}
          >
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ResetPassword;
