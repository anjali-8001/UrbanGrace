import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/auth";
import Spinner from "./Spinner";
import { Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const [ok, setOK] = useState(false);
  const [auth] = useAuth();

  const authUserCheck = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/auth/auth-user`, {
      headers: {
        Authorization: auth?.token,
      },
    });
    if (res.data.ok) {
      setOK(true);
    } else {
      setOK(false);
    }
  };

  useEffect(() => {
    if (auth?.token) authUserCheck();
  });


  return ok ? <Outlet /> : <Spinner />;
}
