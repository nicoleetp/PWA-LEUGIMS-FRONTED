import { MyRoutes } from "routes/MyRoutes";
import { ToastContainer } from "react-toastify";
// toast
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <MyRoutes />
    </>
  );
};

export default App;
