import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "styles/main.scss";
import { AuthProvider } from "context/AuthProvider.jsx";
import { AdminProvider } from "context/AdminProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </AuthProvider>
  </React.StrictMode>
);
