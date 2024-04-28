import React, { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../Styles/Spinner.css";
import { useLocation, useNavigate } from "react-router-dom";

function Spinner({ path = "/login" }) {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);

    if (count === 0) {
      navigate(path, {
        state: location.pathname,
      });
    }
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);

  return (
    <div className="spinner">
      <h3>Loading</h3>
      <br />
      <ScaleLoader height={50} margin={5} />
    </div>
  );
}

export default Spinner;
