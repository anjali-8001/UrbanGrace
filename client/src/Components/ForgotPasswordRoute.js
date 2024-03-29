import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";

function ForgotPasswordRoute() {
  const [ok, setOK] = useState(false);

  const authUserCheck = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/auth/auth-forgotpassword`,
      {
        withCredentials: true,
      }
    );
    if (res.data.ok) {
      setOK(true);
    } else {
      setOK(false);
    }
  };

  useEffect(() => {
    authUserCheck();
  }, []);

  return ok ? <Outlet /> : <Spinner />;
}

export default ForgotPasswordRoute;
