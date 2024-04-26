import { createContext, useContext, useState } from "react";

const RecoveryContext = createContext();

const RecoveryProvider = ({ children }) => {
  const [remail, setRemail] = useState();

  return (
    <RecoveryContext.Provider value={[remail, setRemail]}>
      {children}
    </RecoveryContext.Provider>
  );
};

const useRecovery = () => useContext(RecoveryContext);

export { useRecovery, RecoveryProvider };
