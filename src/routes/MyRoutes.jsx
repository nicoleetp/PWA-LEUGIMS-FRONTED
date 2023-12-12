import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "auth/layouts/AuthLayout";
import { LoginPage } from "auth/pages/LoginPage";
import { AdminLayout } from "admin/layouts/AdminLayout";
import {
  CategoryProduct,
  Dashboard,
  Users,
  CategoryService,
  Products,
  Services,
  Config,
  Slider,
  History,
  Contact,
} from "admin/pages";
import {
  NewUser,
  EditUser,
  NewProduct,
  EditProduct,
  ViewProduct,
  NewService,
  EditService,
  NewConfig,
  NewSlider,
  EditSlider,
  ViewSlider,
  NewHistory,
  EditHistory,
} from "admin/views";
import { FormEditConfig } from "admin/components";

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
          {/* Users */}
          <Route path="/users" element={<Users />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/user/:id" element={<EditUser />} />

          {/* Categories products */}
          <Route path="/category-product" element={<CategoryProduct />} />
          {/* Products */}
          <Route path="/products" element={<Products />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />

          {/* Categories service */}
          <Route path="/category-service" element={<CategoryService />} />

          {/* Service */}
          <Route path="/services" element={<Services />} />
          <Route path="/new-service" element={<NewService />} />
          <Route path="/edit-service/:id" element={<EditService />} />

          {/* Config */}
          <Route path="/config" element={<Config />} />
          <Route path="/new-config" element={<NewConfig />} />
          <Route path="/edit-config/:id" element={<FormEditConfig />} />

          {/* Slider */}
          <Route path="/slider" element={<Slider />} />
          <Route path="/new-slider" element={<NewSlider />} />
          <Route path="/edit-slider/:id" element={<EditSlider />} />
          <Route path="/view-slider/:id" element={<ViewSlider />} />

          {/* History */}
          <Route path="/history" element={<History />} />
          <Route path="/new-history" element={<NewHistory />} />
          <Route path="/edit-history/:id" element={<EditHistory />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
