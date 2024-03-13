import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/auth";
import axios from "axios";
import Spinner from "./Spinner";
import { Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminAuthCheck = async () => {
      const res = await axios
        .get(`${process.env.REACT_APP_API}/auth/auth-admin`, {
          headers: {
            Authorization: auth?.token,
          },
        })
        .catch((err) => {
          setOk(false);
        });
      if (res?.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      adminAuthCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="/" />;
}

export default AdminProtectedRoute;
