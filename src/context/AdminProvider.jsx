import { createContext } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
};

export { AdminProvider };
export default AdminContext;
