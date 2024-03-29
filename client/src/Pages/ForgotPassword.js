import React, { useState } from "react";
import Layout from "../Components/Layout";
import "../Styles/ForgotPassword.css";
import OtpInput from "react-otp-input";
import { useRecovery } from "../Contexts/recovery";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [otp, setOtp] = useState();
  const [remail] = useRecovery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/verify-otp`,
        {
          email: remail,
          otp,
        },
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      if (res && res.data?.success) {
        navigate("/reset-password");
        toast.success("Otp verified");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/forgot-password`,
        {
          email: remail,
        },
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      if (res && res.data?.success) {
        navigate("/forgot-password");
        toast.success("Otp sent successfully");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="fpContainer">
        <div className="fpHeading">Email Verification</div>

        <label>Enter OTP</label>
        <div className="fpOtpContainer">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: 50,
              height: 50,
              backgroundColor: "#EDEDEC",
              border: "none",
              borderRadius: 5,
              fontSize: 25,
            }}
          />
          <div className="resendOtp">
            <span>Didn't receive OTP ? </span>
            <button
              onClick={(e) => forgotPasswordHandler(e)}
              disabled={loading && true}
            >
              Resend OTP
            </button>
          </div>
        </div>

        <button className="fpButton" onClick={(e) => handleVerifyOtp(e)}>
          Verify Otp
        </button>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
