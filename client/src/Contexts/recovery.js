import { createContext, useContext, useState } from "react";

const RecoveryContext = createContext();

const RecoveryProvider = ({ children }) => {
  const [remail, setRemail] = useState();

  // useEffect(() => {
  //   if (page === "login") {
  //     if (page === "login") return <Login />;
  //     if (page === "otp") return <OTPInput />;
  //     if (page === "reset") return <Reset />;
  //   }
  // }, [page]);

  return (
    <RecoveryContext.Provider value={[remail, setRemail]}>
      {children}
    </RecoveryContext.Provider>
  );
};

const useRecovery = () => useContext(RecoveryContext);

export { useRecovery, RecoveryProvider };
