import { createContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <AdminContext.Provider value={{ isOpen, onOpenModal, onCloseModal }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider };
export default AdminContext;
