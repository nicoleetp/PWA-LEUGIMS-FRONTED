import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "auth/layouts/AuthLayout";
import { LoginPage } from "auth/pages/LoginPage";
import { AdminLayout } from "admin/layouts/AdminLayout";
import { Dashboard, Users } from "admin/pages";
import { NewUser, EditUser } from "admin/views";

export const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        {/* Admin */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
